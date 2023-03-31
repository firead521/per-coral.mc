const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('discord')
		.setDescription('Get the link to the official discord server'),
	async execute(interaction) {
		var embed = new EmbedBuilder()
            .setColor("#0000FF")
            .setTitle("🔗 Link discord 🔗")
            .setDescription("https://discord.gg/b6gmzejuKn")

		await interaction.reply({ embeds: [embed] });
	},
};