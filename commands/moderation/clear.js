const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears a specified amount of messages')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('The number of messages to clear')
                .setRequired(true)),
    async execute(interaction) {
        const { options } = interaction;
        const amount = options.getInteger('amount');

        if (amount < 1 || amount > 500) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('⚠️ ERROR ⚠️')
                .setDescription('You can only clear between 1 and 100 messages')
        }

        try {
            await interaction.channel.bulkDelete(amount, true);

            const embed = new EmbedBuilder()
                .setColor('#0000FF')
                .setTitle('✅ SUCCESS ✅')
                .setDescription(`Cleared ${amount} messages!`);

            await interaction.reply({ embeds: [embed], ephemeral: true });
        
        } catch (error) {
            
            console.error(error);
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('⚠️ ERROR ⚠️')
                .setDescription('An error occurred while trying to clear messages');

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
};