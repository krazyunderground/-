const translate = require('translatte');

module.exports = {
    name: "messageCreate",
    async execute(Discord, client, message){
        if(message.author.bot) return

        if(!await client.db.get(`${message.guild.id}.antilang`)){
            await client.db.set(`${message.guild.id}.antilang`, "delete")
        }

        const emotes = (str) => str.match(/<a?:.+?:\d{18}>|\p{Extended_Pictographic}/gu)

        if(emotes(message.content)){
            emotes(message.content).forEach(emoji => {
                message.content = message.content.replace(emoji, "")
            });

            console.log("filtered")
        }

        if(message.content === "") return console.log("empty")

        const option = await client.db.get(`${message.guild.id}.antilang`)

        // // client.langDetector.detect(message.content).then(function(result) {
        // //     if(result[0]?.language !== "en"){
        //         if(option === "delete"){
        //             translate(message.content, {to: 'en'}).then(res => {
        //                 if(message.content === res.text) return
        //                 else message.delete()
        //             })
        //         } else {
        //             message.react("🧾")
        //         }
                
        // //     }
        // // });
        translate(message.content, {to: 'en'}).then(res => {
            if(message.content === res.text) return
            if(option === "delete"){
                message.delete()
            } else {
                message.react("🧾")
            }
        })
    }
}