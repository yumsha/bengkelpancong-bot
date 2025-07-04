
# 🎫 Discord Auto Message Bot for Ticket Channels

A Discord bot built with **Node.js** and **discord.js v14** that automatically sends an embed message when a new ticket channel is created under specified categories. Perfect for automating responses like payment instructions, service rules, or welcome notes in support ticket systems.

---

## 📌 Features

- ✅ Automatically sends a rich embed message when a ticket is created
- 🖼️ Supports image embeds (e.g., QR code, payment screenshots)
- 🧠 Prevents duplicate messages if another message already exists (e.g., from Ticket Tool)
- 🗂️ Multi-category support using environment variables
- ⚙️ Simple `.env` configuration
- 🌐 Deployable on free platforms like **Render**

---

## 🧩 Tech Stack

| Tool         | Description                             |
|--------------|-----------------------------------------|
| Node.js      | JavaScript runtime environment          |
| discord.js v14 | Modern Discord bot framework           |
| dotenv       | Manage secret environment variables     |
| Express.js   | Lightweight server for uptime pings     |
| Render.com   | Free hosting platform (always online)   |
| Imgur        | Embed image hosting                     |
| Git & GitHub | Version control and collaboration       |

---

## 🔧 Installation

1. Clone this repo:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
DISCORD_TOKEN=your_discord_bot_token
CATEGORY_IDS=your_category_ids
```

> You can provide multiple category IDs, separated by commas.

---

## 🚀 Run the Bot

```bash
node index.js
```

Or, for development with live reload:

```bash
npx nodemon index.js
```

---

## 🌐 Deploy on Render

1. Create a new **Web Service**
2. Connect your GitHub repo
3. Set `Build Command` to:
```bash
npm install
```
4. Set `Start Command` to:
```bash
node index.js
```
5. Add environment variables under **Environment > Add Secret File** or individually
6. Make sure port `3000` is open if you're using Express ping

---

## 📄 License

This project is open-sourced under the **MIT License**.

---

## ✨ Credits

Created with caffeine by yumsha
Inspired by community use-cases of Ticket Tool automation.
