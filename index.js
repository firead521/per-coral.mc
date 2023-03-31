  //// Require the necessary discord.js classes
  const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
  const { token } = require('./config.json');
  
  // Create a new client instance
  const client = new Client({ intents: [3276799] });
  
  const {loadEvents} = require("./Handlers/eventHandler");
  const {loadCommands} = require("./Handlers/commandHandler");
  // Collection
  client.commands = new Collection();
  
  // Log in to Discord with your client's token
  client.login(token).then(() => {
	  loadCommands(client);
	  loadEvents(client);
	})
	.catch((err) => console.log(err));;
 //
 
	


