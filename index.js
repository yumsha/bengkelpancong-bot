const express = require('express');
const app = express();
const { Client, GatewayIntentBits, ChannelType, ActionRowBuilder, ButtonBuilder,ButtonStyle, EmbedBuilder, Events, AttachmentBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const allowedCategoryIds = process.env.CATEGORY_IDS.split(",");

// ===== EVENT SAAT BOT SIAP =====
client.once('ready', () => {
  console.log(`✅ Bot siap sebagai ${client.user.tag}`);
});

// faq autoreply
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const allowedFaqChannelId = process.env.FAQ_CHANNEL_ID;
  if (message.channel.id !== allowedFaqChannelId) return;

  const content = message.content.toLowerCase();

  const faq = [
    {
      keywords: ['harga req skin', 'biaya req skin', 'ongkos req skin'],
      respon: ['Harga Request skin dengan prosess 1-3 hari itu Rp. 35.000,- tergantung Antrean yang ada di channel <1293940330223239228>']
    },
    {
      keywords: ['env', 'harga env', 'object env'],
      respon: ['Harga req ENV Rp. 35.000/30 Object termasuk basemodel, durasi pengerjan 2-5 hari tergantung antrean yang ada di channel <1293940330223239228>']
    },
    {
      keywords: ['bisa req skin', 'maximal req skin'],
      respon: ['Bisa banget kink, langsung aja take ticket!']
    },
    {
      keywords: ['head dari kita', 'object dari kita', 'saya punya kepalanya', 'saya punya object dari skin lama'],
      respon: ['Kalo kamu punya head dari skin lama, bisa banget kok di pasangin ke skin baru!']
    }
  ];

  for (const faqs of faq) {
    if (faqs.keywords.some(k => content.includes(k))) {
      await message.reply(faqs.respon[0]); // atau random kalau mau
      break;
    }
  }
});


// payment embed
client.on('channelCreate', async (channel) => {
  if (
    channel.type === ChannelType.GuildText &&
    allowedCategoryIds.includes(channel.parentId)
  ) {
    console.log(`🎫 Tiket baru dibuat! : ${channel.name}`);

    setTimeout(async () => {
      try {
        const messages = await channel.messages.fetch( { limit: 10 } );
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

// Forsale autoforward

client.on('messageCreate', async (message)=>{
  if (message.author.bot) return;

  const sourceChannelId = process.env.SOURCE_CHANNEL_ID;
  const targetChannelId = process.env.TARGET_CHANNEL_ID;
  const allowedRoles = process.env.ALLOWED_ROLE_ID;

  if (message.channel.id !== sourceChannelId) return;
  if (!message.member.roles.cache.has(allowedRoles)) return;

  const attachments = message.attachments.first();
  const content = message.content || "**No content provided**";

  const embed = new EmbedBuilder()
    .setTitle("Preview for your Forsale Post")
    .setDescription(content)
    .setColor(0x00AE86)
    .setFooter({ text: `Dibuat oleh: ${message.member.displayName}`});
  
  if (attachments) embed.setImage(attachments.url);

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
    .setCustomId('confirm_post')
    .setLabel('Post')
    .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
    .setCustomId('cancel_post')
    .setLabel('Cancel')
    .setStyle(ButtonStyle.Danger)
  );

  const preview = await message.channel.send({
    content: `<@${message.author.id}> Tolong konfirmasi sebelum SKIN dikirim ke <#${targetChannelId}>`,
    embeds: [embed],
    components: [row]
  });

  const collector = preview.createMessageComponentCollector({time: 60_000})

  collector.on('collect', async (i) => {
    if (i.user.id !== message.author.id){
      await i.reply({
        content: 'Bukan lu yang bikin ini post woilah'
      }); return;
    }

    if(i.customId === 'confirm_post') {
      const target = await client.channels.fetch(targetChannelId);
      await target.send({
        content: `Dikirim sama <@${message.author.id}>`,
        files: attachments ? [attachments.url] : []
      });
      await i.update({content : 'Skin berhasil dikirim!', embeds: [], components: []});
    }

    if (i.customId === 'cancel_post'){
      await i.update({content: 'Post dibatalkan!', embeds: [], components: []});
    }
  });

  collector.on('end', async (_, reason) => {
    if (reason === 'time'){
      await preview.edit({
        content: 'Kelamaan lu konfirmasinya, post dibatalkan.',
        embeds: [],
        components: []
      })
    }
  })
})

// ===== KEEP-ALIVE SERVER UNTUK RENDER =====
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Bot Nyala');
});

app.listen(3000, () => {
  console.log('nyala di port 3000');
});

client.login(process.env.DISCORD_TOKEN);
