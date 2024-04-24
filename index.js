const {
  Client,
  Events,
  GatewayIntentBits,
  PermissionsBitField,
} = require("discord.js");

const { token } = require("./config.json");
const { guildId } = require("./config.json");
const { channelId } = require("./config.json");

const flags = [
  PermissionsBitField.Flags.SendMessages,
  PermissionsBitField.Flags.ViewChannel,
  PermissionsBitField.Flags.ManageChannels,
];

const permissions = new PermissionsBitField(flags);

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

guild = 0;
channel = 0;

client.once(Events.ClientReady, (readyClient) => {
  guild = client.guilds.cache.get(guildId);
  channel = guild.channels.cache.get(channelId);

  // update first
  channelNameUpdate();
  // Schedule the topic update function to run every day
  setInterval(() => {
    channelNameUpdate();
  }, 12 * 60 * 60 * 1000); // every 12 hour
});

function channelNameUpdate() {
  if (!guild) {
    console.error("Guild not found.");
    return;
  }
  if (!channel) {
    console.error("Channel not found.");
    return;
  } 

  newName = getChannelName();

  // do it
  channel
    .setName(newName)
    .then((updated) => {
      console.log("Success setting new channel name: " + newName);
    })
    .catch((error) => {
      console.error("Error setting topic: ", error);
    });
}

function getChannelName(diffDays) {  
  return getDaysLeft() + " days-until-that";
}

function getDaysLeft() {
  const now = new Date();
  const then = new Date("2024-06-20"); // day of event!
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  // difference in milliseconds
  const diffMs = then.getTime() - now.getTime();
  // convert to days
  const diffDays = Math.floor(diffMs / oneDay);

  return diffDays;
}



// Log in to Discord with token 
client.login(token);
