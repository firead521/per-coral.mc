const { ActivityType } = require('discord.js');

module.exports = {
  name: 'ready',
  execute(client) {
    console.log(`Bot is started!`);
    client.user.setActivity('/help', { type: ActivityType.Watching });
  }
};