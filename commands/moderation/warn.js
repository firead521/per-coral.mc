const { CommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Warn a user with an infraction")
        .addUserOption(option =>
            option.setName('utente')
                  .setDescription('Utente da warnare')
                  .setRequired(true))
        .addStringOption(option =>
            option.setName('motivo')
                  .setDescription('Motivo del warn')
                  .setRequired(true)),

    async execute(interaction = new CommandInteraction()) {
        const utente = interaction.options.getUser('utente');
        const motivo = interaction.options.getString('motivo');

        const member = interaction.guild.members.cache.get(utente.id);
        if (!member) {
            return interaction.reply({
                content: "⚠️ L'utente non è stato trovato.",
                ephemeral: true
            });
        }

        if (member.roles.cache.find(role => role.name.toLowerCase() === 'moderatore')) {
            return interaction.reply({
                content: "⚠️ Non puoi warnare un moderatore.",
                ephemeral: true
            });
        }

        if (member.id === interaction.user.id) {
            return interaction.reply({
                content: "⚠️ Non puoi warnarti da solo.",
                ephemeral: true
            });
        }

        if (member.user.bot) {
            return interaction.reply({
                content: "⚠️ Non puoi warnare un bot.",
                ephemeral: true
            });
        }

        // Aggiungi qui la tua logica per il warn

        const embed = new EmbedBuilder()
            .setAuthor(`[WARN] ${utente.tag}`, utente.displayAvatarURL({ dynamic: true }))
            .setColor("#6143CB")
            .addField("Motivo", motivo)
            .addField("Moderatore", interaction.user.toString())
            .setFooter(`User ID: ${utente.id}`);

        await interaction.reply({
            content: `L'utente ${utente.tag} è stato warnato per il motivo: ${motivo}`,
            ephemeral: true
        });

        const logEmbed = new EmbedBuilder()
            .setTitle("🔱 Warn 🔱")
            .setColor("#0000FF")
            .setThumbnail(utente.displayAvatarURL({ dynamic: true }))
            .addField("⏰ Tempo", `${new Date().toLocaleString()}`, false)
            .addField("🛡️ Moderatore", `${interaction.user.toString()} - ID: ${interaction.user.id}`, false)
            .addField("👤 Membro", `${utente.toString()} - ID: ${utente.id}`, false)
            .addField("Motivo", motivo, false);

        await interaction.channel.send({
            embeds: [embed]
        }).then(msg => {
            logEmbed.setDescription(`[Link al messaggio](${msg.url})`);

            if (!isMaintenance()) {
                interaction.client.channels.cache.get(log.moderation.warn).send({
                    embeds: [logEmbed]
                });
            }
        });

        const userStats = userStatsList.find(user => user.id === utente.id);
        if (!userStats) {
            const newUserStats = {
                id: utente.id,
                username: utente.username || utente.user.username,
                roles: [],
                warn: [],
                moderation: {
                    "type": "",
                    "since": "",
                    "until": "",
                    "reason": "",
                }
            }
        }
    }
};