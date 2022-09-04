const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    name: "whitelist",
	data: new SlashCommandBuilder()
		.setName("whitelist")
		.setDescription("whitelist certain non-english phrases related, making the bot ignore them")
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The phrase being whitelisted')
                .setRequired(true)
        ),
    /*- execute -*/
	async execute(Discord, client, interaction) {
        await client.db.push(`${interaction.guild.id}.whitelist`, interaction.options.getString('input').toLowerCase())

        interaction.reply({content: `I have added the phrase/word to the whitelist!`})
	},
};