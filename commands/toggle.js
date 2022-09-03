const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    name: "toggle",
	data: new SlashCommandBuilder()
		.setName("toggle")
		.setDescription("toggle what action the bot takes when a non-english message is sent"),
    /*- execute -*/
	async execute(Discord, client, interaction) {
        currentOption = await client.db.get(`${interaction.guild.id}.antilang`)
        if(currentOption === "delete"){
            newOption = "translate"
        } else {
            newOption = "delete"
        }
        await client.db.set(`${interaction.guild.id}.antilang`, newOption)

        interaction.reply({content: `I have changed the current action to ${newOption}`})
	},
};