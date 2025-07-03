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
    console.log(`🎫 Tiket baru dibuat! : ${channel.name}`);

    setTimeout(async () => {
      try {
        const messages = await channel.messages.fetch({ limit: 10 });
        const alreadySent = messages.some(msg => msg.author.id === client.user.id);

        if (alreadySent) {
          console.log(`udah dikirim, goblok. ${channel.name}, tidak dikirim ulang.`);
          return;
        }

        await channel.send({
          embeds: [{
            title: "🟡 BENGKEL PANCONG PAYMENT 🟡",
            description: `PASTIKAN UNTUK CEK TERLEBIH DAHULU NOMINAL DAN MENGGUNAKAN PAYMENT SERTA CEK TERLEBIH DAHULU ATAS NAMA SESUAI PAYMENT YANG TERSEDIA ⚠️\n\nGOPAY : 089627299428 A/N BUSTAMI ✅\n📱 089627299428 A/N MOHAMMAD RIZKY QURBANY ✅\n⚠️ UNTUK PENGGUNAAN QRIS DIKENAKAN PAJAK +500⚠️`,
            image: { url: "https://i.imgur.com/LKEdq34.png" },
            color: 0x00AE86
          }]
        });

        console.log(`✅ Embed dikirim ke ${channel.name}`);
      } catch (err) {
        console.error(`Error pas mau dikirim ke ${channel.name}:`, err);
      }
    }, 3000);
  } else {
    console.log(`ℹ️ Channel ${channel.name} dah dibikin tapi gadapet izin, kocak..`);
  }
});

// ===== KEEP-ALIVE SERVER UNTUK RENDER =====
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Bot Nyala');
});

app.listen(3000, () => {
  console.log('nyala di port 3000');
});

client.login(process.env.DISCORD_TOKEN);
