import { FastifyReply, FastifyRequest } from 'fastify'
import AWS from 'aws-sdk'
import { randomBytes } from 'crypto';

const s3 = new AWS.S3({
  accessKeyId: '',
  secretAccessKey: '',
  region: 'us-east-1'
});

export class ImgControllers {
  async upload(request: FastifyRequest, reply: FastifyReply) {
    const file = await request.file();

    if (file === undefined) {
      throw new Error()
    }

    const random = randomBytes(5)
    const name = `${random}-${file.filename}`

    const params = {
      Bucket: 'discordimagupload',
      Key: name,
      Body: await file.toBuffer()
    };
    
    try {
      const data = await s3.upload(params).promise();
      console.log('Upload successful:', data.Location);
      reply.send({ url: data.Location });
    } catch (err) {
      console.error('Upload failed:', err);
      reply.status(500).send('Upload failed');
    }
    // const __filename = fileURLToPath(import.meta.url)
    // const __dirname = dirname(__filename)
    // const upload = await request.file({
    //   limits: {
    //     fileSize: 10_485_760, // 5mb
    //   },
    // })

    // if (!upload) {
    //   return reply.status(400).send()
    // }
    

    // const mimeTypeRegex = /^(image|video)\/[a-zA-z]+/
    // const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

    // if (!isValidFileFormat) {
    //   return reply.status(400).send()
    // }

    // const fileId = randomUUID()
    // const extension = extname(upload.filename)

    // const fileName = fileId.concat(extension)

    // const writeSream = createWriteStream(
    //   resolve(__dirname, '../../../upload', fileName),
    // )

    // await pump(upload.file, writeSream)

    // const fullUrl = request.protocol.concat('://').concat(request.hostname)

    // const fileUrl = new URL(`/upload/${fileName}`, fullUrl).toString()

    // return fileUrl 
  }
}
