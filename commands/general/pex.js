const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('annpe')
		.setDescription('pex a player user')
		.addStringOption(option =>
			option.setName('message')
				.setDescription('Messaggio dell\'annuncio')
				.setRequired(true)),
	async execute(interaction) {
		const { guild, channel } = interaction;
		const user = interaction.member.user;
		const member = guild.members.cache.get(user.id);

		if (!member.permissions.has([PermissionsBitField.Flags.SendMessages])) {
			return interaction.reply({ content: '⚠️ Non hai il permesso di eseguire questo comando', ephemeral: true });
		}

		const message = interaction.options.getString('message');

		const announce = new EmbedBuilder()
			.setColor('#0000FF')
			.setTitle('✅️NUOVO PEX✅️')
			.setDescription(message);

		await channel.send({ embeds: [announce] });
        await channel.send({ content: '@everyone ', ephemeral: false });
	},
};