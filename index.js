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
    title: "🟡 BENGKEL PANCONG PAYMENT 🟡",
    description: `PASTIKAN UNTUK CEK TERLEBIH DAHULU NOMINAL DAN MENGUNKAN PAYMENT SERTA CEK TERLEBIH DAHULU ATAS NAMA SESUAI PAYMENT YANG TERSEDIA ⚠️:\n\n GOPAY : 089627299428 A/N BUSTAMI ✅\n📱 089627299428 A/N MOHAMMAD RIZKY QURBANY  ✅\n ⚠️UNTUK PENGGUNAAN QRIS DIKENAKAN PAJAK +500⚠️`,
    image: {
      url: "https://imgur.com/a/pGFo5z8.png"
    },
    color: 0x00AE86
  }]
});

  }
});

client.login(process.env.DISCORD_TOKEN);

// 

// 

// GOPAY : 089627299428 A/N BUSTAMI ✅

// DANA :  

// 

// STAY AMANAH DAN SUKSES SELALU KING 🟡