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

    setTimeout(() => {
      channel.send({
        embeds: [{
          title: "🟡 BENGKEL PANCONG PAYMENT 🟡",
          description: `PASTIKAN UNTUK CEK TERLEBIH DAHULU NOMINAL DAN MENGGUNAKAN PAYMENT SERTA CEK TERLEBIH DAHULU ATAS NAMA SESUAI PAYMENT YANG TERSEDIA ⚠️:\n\n📱GOPAY : 089627299428 A/N BUSTAMI ✅\n📱DANA 089627299428 A/N MOHAMMAD RIZKY QURBANY ✅\n⚠️ UNTUK PENGGUNAAN QRIS DIKENAKAN PAJAK +500 ⚠️`,
          image: {
            url: "https://i.imgur.com/LKEdq34.png"
          },
          color: 0x00AE86
        }]
      }).then(() => {
        console.log(`udah dikirim ${channel.name}`);
      }).catch((err) => {
        console.error(`Gagal kirim ${channel.name}:`, err);
      });
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
