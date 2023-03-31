const { InteractionType, EmbedBuilder } = require('discord.js');
const client = require('../../index');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isStringSelectMenu() || interaction.customId !== 'menuHelp') return;

        const selected = interaction.values[0];

        console.log(selected)

        switch (selected) {
            case 'general': {
                const embed = new EmbedBuilder()
                    .setColor('#7CFC00')
                    .setTitle('📩 General 📩')
                    .addFields(
                        { name: '</help:1081679842359119917>', value: 'Show a list of commands', inline: true },
                        { name: '</ping:1077695074210676897>', value: 'Show bot latency', inline: true },
                        { name: '</server-info:1081679842359119918>', value: 'Show server info', inline: true },
                        { name: '</discord:1081679842359119914>', value: 'Show discord invite', inline: true },
                        { name: '</bans:1081679842359119916>', value: 'Show total bans for this server', inline: true },
                        { name: '</ann:1082391209936437288>', value: 'Send announce', inline: true },
                    )

                await interaction.update({ embeds: [embed] });
                break;
            }
            case 'moderation': {
                const embed = new EmbedBuilder()
                    .setColor('#005eff')
                    .setTitle('👮‍♀️ Moderation 👮‍♀️')
                    .addFields(
                        { name: '</warn:1081679842359119920>', value: 'Warn an user', inline: true },
                        { name: '</mute:id>', value: 'Mute an user', inline: true },
                        { name: '</kick:1079192801457229824>', value: 'Kick an user', inline: true },
                        { name: '</ban:id>', value: 'Ban an user', inline: true },
                        { name: '</clear:1081679842359119919>', value: 'Clear a specified amount of messages', inline: true },
                    )

                await interaction.update({ embeds: [embed] });
                break;
            }
        }
    },
};
