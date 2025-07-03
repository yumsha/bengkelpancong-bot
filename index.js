const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

client.once('ready', () => {
  console.log(`✅ Bot siap sebagai ${client.user.tag}`);
});

client.on('channelCreate', async (channel) => {
  if (
    channel.type === ChannelType.GuildText &&
    channel.parentId === process.env.CATEGORY_ID
  ) {
    console.log(`🎫 Tiket baru dibuat: ${channel.name}`);

await channel.send({
  embeds: [{
    title: "Metode Pembayaran",
    description: `Silakan transfer ke:\n\n🏦 BCA: 123456789\n📱 DANA: 081234567890`,
    image: {
      url: "https://imgur.com/a/pGFo5z8"
    },
    color: 0x00AE86
  }]
});

  }
});

client.login(process.env.DISCORD_TOKEN);
