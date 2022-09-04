const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: "help",
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Provides information on where to begin, and how to use commands moving forward"),
    /*- execute -*/
	async execute(Discord, client, interaction) {
        const pingEmbed = new Discord.EmbedBuilder()
            .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
            .setTitle(`Help Embed`)
            .setDescription(`Currently, there are 3 basic commands: `)
            .addFields([{
                name: "/whitelist", value: "Allows you to whitelist any phrases or words that may accidentally trip the system.\nExample: \`/whitelist input:'los pollos hermanos'\`"
            },{
                name: "/toggle", value:"Simply run the command once, and it will toggle the behaviour of the bot. The two modes are delete or translate (translate adds a reaction, which if pressed will respond with the message in english)"
            }, {
                name: "/ping", value:"Gives statistics on values such as latency, API latency and uptime. Also a good way of checking if the bot's online"
            }
            ])
            .setColor('#d00a09')
            .setTimestamp()
        interaction.reply({content: null, embeds: [pingEmbed]})
	},
};