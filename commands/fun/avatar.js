const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Shows the avatar of a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('L\'utente di cui mostrare l\'avatar')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        if (!user) {
            return interaction.reply('⚠️ Utente non trovato');
        }

        const embed = new EmbedBuilder()
            .setColor("#0000FF")
            .setTitle(user.tag)
            .setDescription("La foto profilo di questo utente")
            .setImage(user.displayAvatarURL({
                dynamic: true,
                format: "png",
                size: 512
            }));

        return interaction.reply({ embeds: [embed] });
    },
};