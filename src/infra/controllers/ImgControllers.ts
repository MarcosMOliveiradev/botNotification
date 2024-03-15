import { FastifyReply, FastifyRequest } from 'fastify'
import AWS from 'aws-sdk'
import 'dotenv/config'

const s3 = new AWS.S3({
  accessKeyId: process.env.Aws_accesskeiid,
  secretAccessKey: process.env.aws_secretaccesskey,
  region: 'us-east-1'
});

export class ImgControllers {
  async upload(request: FastifyRequest, reply: FastifyReply) {
    const file = await request.file();

    if (file === undefined) {
      throw new Error()
    }

    let random
    // gera o numero da sala
    for(var i = 0; i < 6; i++){
      i == 0 ?  random = Math.floor(Math.random() * 10).toString() :
      random += Math.floor(Math.random() * 10).toString()
    }
    const name = `${random}-${file.filename}`

    const params = {
      Bucket: 'discordimagupload',
      Key: name,
      ContentType: file.mimetype,
      Body: await file.toBuffer(),
      ACL: "public-read"
    };
    
    try {
      const data = await s3.upload(params).promise();
      console.log('Upload successful:', data.Location);
      reply.send({ url: data.Location });
    } catch (err) {
      console.error('Upload failed:', err);
      reply.status(500).send('Upload failed');
    }
  }
}
