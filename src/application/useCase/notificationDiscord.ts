import {Client, GatewayIntentBits} from 'discord.js'
import { config } from 'dotenv'
import { PrismaNotificationRepository } from '../../database/repositories/prismaNotificationRepositori';

const repositories = new PrismaNotificationRepository()

// https://discord.com/oauth2/authorize?client_id=1217150088195997726&permissions=2048&scope=bot

config();
const client = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds
    ]
})

export async function conectDiscord() { 
    client.login(process.env.DISCORD_TOKEN)
    
    client.on('ready', ()=> {
        console.log('bot on')
        getNotification()
    })
}
//TODO: Colocar novo id de canal para test e ajusar para a imagem ir corretamente na mensagem mais outras mensagens e liks
async function getNotification() {
    const getAllNotification = await repositories.findAll()
    try {
        const channel = client.channels.cache.get('')

        if (channel === undefined) {
            throw new Error('erro de canal')
        }

        if(getAllNotification[0].urlImg != null) {

            const img = getAllNotification[0].urlImg
            const text = getAllNotification[0].text
            const link = getAllNotification[0].link
            channel.send(img + text + link)

            await repositories.putch(getAllNotification[0].id, true)
            return {
                statu: 201,
                menssage: 'mensagen enviado'
            }
        }

        const text = getAllNotification[0].text
        const link = getAllNotification[0].link
        channel.send(text + link)

        await repositories.putch(getAllNotification[0].id, true)

        return {
            statu: 201,
            menssage: 'mensagen enviado'
        }
    } catch(err) {
        console.log('erro' + err)
    }

    
}