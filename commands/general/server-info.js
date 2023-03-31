const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ChannelType, vocalCount, message } = require('discord.js');
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-info')
        .setDescription('View server info'),
    async execute(interaction) {
        const server = interaction.guild;
        const botCount = server.members.cache.filter(member => member.user.bot).size;
        const memberCount = server.memberCount - botCount;

        const categoryCount =  server.channels.cache.filter(c => c.type === ChannelType.GuildCategory).size;
        const textCount =  server.channels.cache.filter(c => c.type === ChannelType.GuildText).size;
        const voiceCount =  server.channels.cache.filter(c => c.type === ChannelType.GuildVoice).size;
        const owner = await server.fetchOwner()

        const embed = new EmbedBuilder()
            .setColor('#0000FF')
            .setTitle(`Info sul server ${server.name}`)
            .setDescription('Tutte le statistiche su questo server')
            .setThumbnail(server.iconURL({ dynamic: true }))
            .addFields(
                { name: '🧑‍💻 Owner', value: `<@${owner.user.id}>`, inline: true },
                { name: '🪧 Server ID', value: `\`\`\`${server.id}\`\`\``, inline: true },
                { name: '👥 Members', value: `\`\`\`Total: ${server.memberCount} | Members: ${memberCount} | Bots: ${botCount}\`\`\``, inline: false },
                { name: '🔊 Server categories and channels', value: `\`\`\`Category: ${categoryCount} | Text: ${textCount} | Voice: ${voiceCount}\`\`\``, inline: false },
                { name: '🗓️ Server create', value: `\`\`\`${moment(server.createdAt).format('ddd DD MMM YYYY, HH:mm')} (${moment(server.createdAt).fromNow()})\`\`\``, inline: false },
                { name: '🔰 Boost level', value: `\`\`\`Level ${server.premiumTier} (${server.premiumSubscriptionCount} boost)\`\`\``, inline: false },
            );

        await interaction.reply({ embeds: [embed] });
    },
};