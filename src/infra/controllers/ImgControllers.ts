import { FastifyReply, FastifyRequest } from 'fastify'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import 'dotenv/config'

const s3Client = new S3Client({region: "us-east-1"}) // Registro no cliente da amazom s3

// Função responsavel por salvar uma imagem no bucket da amzon e gerar um link
export class ImgControllers {
  async upload(request: FastifyRequest, reply: FastifyReply) {
    const file = await request.file();

    if (file === undefined) {
      throw new Error()
    }

    // Recria o nome para não aver substituição de arquivo
    let random
    for(var i = 0; i < 6; i++){
      i == 0 ?  random = Math.floor(Math.random() * 10).toString() :
      random += Math.floor(Math.random() * 10).toString()
    }
    const fullName = file.filename
    const newFileName = fullName.replace(/\s/g, ''); // responsavel por tirar os espaços do nome que vem do fileType
    const name = `${random}-${newFileName}`


    // Cria as definições que irão para o bucket
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
