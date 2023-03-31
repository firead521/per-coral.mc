const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
  name: 'guildMemberRemove',
  once: false,
  async execute(member) {
    try {
      const channel = member.guild.channels.cache.find(channel => channel.name === 'addio');
      if (!channel) return;
      
      const embed = new Discord.EmbedBuilder()
        .setColor('#ff0000')
        .setTitle(`L'utente, e uscito dal server :cry: `)
        .setDescription(`Arrivederci ${member.user.tag}! Speriamo di rivederti presto, Ci mancherai`)
        .setThumbnail(member.displayAvatarURL({
            dynamic: true,
            format: "png",
        }))

      await channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
    }
  },
};