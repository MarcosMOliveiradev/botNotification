import { FastifyReply, FastifyRequest } from 'fastify'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import 'dotenv/config'

const s3Client = new S3Client({region: "us-east-1"})

export class ImgControllers {
  async upload(request: FastifyRequest, reply: FastifyReply) {
    const file = await request.file();

    if (file === undefined) {
      throw new Error()
    }

    let random
    for(var i = 0; i < 6; i++){
      i == 0 ?  random = Math.floor(Math.random() * 10).toString() :
      random += Math.floor(Math.random() * 10).toString()
    }
    const fullName = file.filename
    const newFileName = fullName.replace(/\s/g, '');
    const name = `${random}-${newFileName}`

    const params = new PutObjectCommand({
      Bucket: 'discordimagupload',
      Key: name,
      ContentType: "image/jpeg",
      Body: await file.toBuffer(),
      ACL: 'public-read-write'
    });
    
    try {
      await s3Client.send(params);
      const imageUrl = `https://discordimagupload.s3.amazonaws.com/${name}`
      reply.send(imageUrl);
    } catch {
      console.error('Upload failed:');
    }
  }
}
