const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bans')
        .setDescription('Fetches a list of banned users'),
    async execute(interaction) {
        try {
            const bans = await interaction.guild.bans.fetch();
            // Trasforma la Collection in un array di tag degli utenti
            let list = bans.map(user => user.user.username).join('\n');

            if (list.length >= 1950) list = `${list.slice(0, 1948)}...`;

            const embed = new EmbedBuilder()
                .setColor('#0000FF')
                .setTitle(`:name_badge: List of Banned Users (${bans.size})`)
                .setDescription(list);

            interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('⚠️ Error ⚠️')
                .setDescription('There was an error fetching the list of banned users.');

            interaction.reply({ embeds: [embed] });
        }
    },
};