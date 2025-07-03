const express = require('express');
const app = express();
const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

const allowedCategoryIds = process.env.CATEGORY_IDS.split(",");

// ===== EVENT SAAT BOT SIAP =====
client.once('ready', () => {
  console.log(`✅ Bot siap sebagai ${client.user.tag}`);
});

client.on('channelCreate', async (channel) => {
  if (
    channel.type === ChannelType.GuildText &&
    allowedCategoryIds.includes(channel.parentId)
  ) {
    console.log(`🎫 Tiket baru dibuat: ${channel.name}, delay 3 detik...`);

    setTimeout(async () => {
      try {
        const messages = await channel.messages.fetch({ limit: 1 });
        if (messages.size > 0) {
          console.log(`⚠️ Sudah ada pesan di ${channel.name}, tidak dikirim ulang.`);
          return;
        }

        await channel.send({
          embeds: [{
            title: "🟡 BENGKEL PANCONG PAYMENT 🟡",
            description: `PASTIKAN UNTUK CEK TERLEBIH DAHULU...`,
            image: { url: "https://i.imgur.com/LKEdq34.png" },
            color: 0x00AE86
          }]
        });

        console.log(`✅ Embed dikirim ke ${channel.name}`);
      } catch (err) {
        console.error(`❌ Error saat kirim embed:`, err);
      }
    }, 3000);
  }
});


// ===== SERVER =====
app.get('/', (req, res) => {
  res.send('Bot Nyala!');
});

app.listen(3000, () => {
  console.log('web nyala di port 3000');
});


client.login(process.env.DISCORD_TOKEN);
