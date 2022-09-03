const translate = require('translatte');

module.exports = {
    name: "messageReactionAdd",
    async execute(Discord, client, reaction, user) {

        if(user.id === client.user.id) return

        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                return;
            }
        }

        if(reaction.emoji.name === "🧾"){
            translate(reaction.message.content, {to: 'en'}).then(res => {
                if(res.from.text.value.length > 0){
                    reaction.message.reply(`${res.from.text.value}`);
                } else {
                    reaction.message.reply(`${res.text}`);
                }
            }).catch(err => {
                console.error(err);
            });
        }
    }
}