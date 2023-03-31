const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const client = require('../../index.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Mostra una lista di comandi'),

    async execute(interaction) {
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('menuHelp')
            .setPlaceholder('Seleziona la categoria...')
            .addOptions([
                {
                   label: '📩 General',
                   description: 'General commands...',
                   value: 'general'
                },
                {
                   label: '👮 Moderation',
                   description: 'Moderation commands...',
                   value: 'moderation'
                },
            ]);

        await interaction.reply({
            embeds: [{
                title: '📜COMANDI-DEL-BOT📜',
                description: 'Prefisso del bot: `/`',
                color: 0x0000FF,
                fields: [
                    {
                        name: '📩 General',
                        value: '',
                    },
                    {
                        name: '👮 Moderation',
                        value: '',
                    },
                    {
                        name: '',
                        value: 'Seleziona una categoria qui sotto per vedere un elenco di comandi',
                    }
                ],
            }],
            components: [new ActionRowBuilder().addComponents(selectMenu)],
            ephemeral: true,
        });
    },
    
};