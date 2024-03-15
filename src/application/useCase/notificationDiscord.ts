import {Client, GatewayIntentBits} from 'discord.js'
import { config } from 'dotenv'
import { PrismaNotificationRepository } from '../../database/repositories/prismaNotificationRepositori';
import { schedule } from 'node-cron'

const repositories = new PrismaNotificationRepository()

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
        schedule("* * * * *", getNotification)
    })
}
async function getNotification() {
    const getAllNotification = await repositories.findAll()

    try {
        const channel = client.channels.cache.get('1217845583881175091')

        if (channel === undefined) {
            throw new Error('erro de canal')
        }

        if(getAllNotification[0].urlImg != null) {
            const img = getAllNotification[0].urlImg
            const text = getAllNotification[0].text
            const link = getAllNotification[0].link
            channel.send(`${text}\n${link}\n${img}`)

            await repositories.putch(getAllNotification[0].id, true)
            return {
                statu: 201,
                menssage: 'mensagen enviado'
            }
        }

        const text = getAllNotification[0].text
        const link = getAllNotification[0].link
        channel.send(`${text}\n${link}`)

        await repositories.putch(getAllNotification[0].id, true)

        return {
            statu: 201,
            menssage: 'mensagen enviado'
        }
    } catch (err) {
        console.log('erro ' + err)
    }

    
}