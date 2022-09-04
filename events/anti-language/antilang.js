const { ClientVoiceManager } = require('discord.js');
const translate = require('translatte');

module.exports = {
    name: "messageCreate",
    async execute(Discord, client, message){
        if(message.author.bot) return

        if(!await client.db.get(`${message.guild.id}.antilang`)){
            await client.db.push(`${message.guild.id}.antilang`, "los pollos hermanos")
        }

        if(!await client.db.get(`${message.guild.id}.whitelist`)){
            await client.db.push(`${message.guild.id}.whitelist`, "delete")
        }

        const emotes = (str) => str.match(/<a?:.+?:\d{18}>|\p{Extended_Pictographic}/gu)

        if(emotes(message.content)){
            emotes(message.content).forEach(emoji => {
                message.content = message.content.replace(emoji, "")
            });
        }

        const option = await client.db.get(`${message.guild.id}.antilang`)
        const whitelist = await client.db.get(`${message.guild.id}.whitelist`)

        whitelist.forEach(phrase => {
            message.content = message.content.replace(phrase, "")
        })

        if(message.content === "") return

        client.langDetector.detect(message.content).then(function(result) {
            if(result[0]?.language !== "en"){
                if(option === "delete"){
                    translate(message.content, {to: 'en'}).then(res => {
                        if(message.content === res.text) return
                        else {
                            message.delete()
                            message.channel.send({content: `English only ${message.author}!`})
                            .then(msg => {
                                setTimeout(() => msg.delete(), 5000)
                            })
                        }
                    })
                } else {
                    message.react("🧾")
                }
                
            }
        });

        
    }
}