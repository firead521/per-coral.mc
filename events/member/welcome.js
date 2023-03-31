const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    const channel = member.guild.channels.cache.find(ch => ch.name === '💎𝕓𝕖𝕟𝕧𝕖𝕟𝕦𝕥𝕚💎');
    if (!channel) return;
    const role = member.guild.roles.cache.find(role => role.name === 'utente');
    if (!role) return;
    await member.roles.add(role);
    
    const welcomeEmbed = new EmbedBuilder()
      .setTitle(':tada: Benvenuto :tada:')
      .setDescription(`Hey! Ciao ${member.user}, sei nuovo? Speriamo che ti piaccia il server e che ci rimarrai e detto ciò, buona permanenza !
      `)
      .setThumbnail(member.displayAvatarURL({
        dynamic: true,
        format: "png",
      }))
      .addFields(
        { name: 'Dimenticavo, Se ti va visita questi Canali:', value: '> <#1077260421356077077>\n> <#1077290467676409996>' }
      )
      .setColor('blue');
    channel.send({ embeds: [welcomeEmbed] });
  }
}