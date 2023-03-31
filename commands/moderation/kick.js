const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('kick')
	.setDescription('Select a member and kick them')
	.addUserOption(option => option.setName('player').setDescription('The member to kick')),
	
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		let member = interaction.guild.members.cache.get(user.id); 
		member.kick();
		
		const embed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('👢 User kicked 👢')
            .setDescription(`Kicked: ${member.user.username}`)
            .setThumbnail(member.user.displayAvatarURL());

        await interaction.reply({ embeds: [embed] });

	}
};