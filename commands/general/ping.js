const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Show bot latency (ms)'),
	async execute(interaction) {
		var embed = new EmbedBuilder()
			.setColor("#49be25")
			.setTitle("Ping del bot")
			.setDescription("Ecco la latenza del bot")
			.addFields(
				{ name: "🐢 Ping", value: `${interaction.client.ws.ping}ms` }
			)

		await interaction.reply({ embeds: [embed] });
	},
};