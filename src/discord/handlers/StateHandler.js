const config = require("../../../config.json");

class StateHandler {
  constructor(discord) {
    this.discord = discord;
  }

  async onReady() {
    console.discord("Client ready, logged in as " + this.discord.client.user.tag);
    this.discord.client.user.setPresence({
      activities: [{ name: `/help | by @duckysolucky` }],
    });

    const channel = await this.getChannel("Guild");
    if (channel === undefined) {
      return console.error(`Channel "Guild" not found!`);
    }

    global.guild = await client.guilds.fetch(config.discord.bot.serverID);
    if (guild === undefined) {
      return console.error(`Guild not found!`);
    }

    console.discord("Guild ready, successfully fetched " + guild.name);

    if (config.verification.autoUpdater) {
      require("../other/updateUsers.js");
    }

    channel.send({
      embeds: [
        {
          author: { name: `Chat Bridge is Online` },
          color: 2067276,
        },
      ],
    });
  }

  async onClose() {
    const channel = await this.getChannel("Guild");
    if (channel === undefined) {
      return console.error(`Channel "Guild" not found!`);
    }

    await channel.send({
      embeds: [
        {
          author: { name: `Chat Bridge is Offline` },
          color: 15548997,
        },
      ],
    });
  }

  async getChannel(type) {
    if (typeof type !== "string" || type === undefined) {
      return console.error(`Channel type must be a string!`);
    }

    switch (type.replace(/§[0-9a-fk-or]/g, "").trim()) {
      case "Guild":
        return this.discord.client.channels.cache.get(config.discord.channels.guildChatChannel);
      case "Officer":
        return this.discord.client.channels.cache.get(config.discord.channels.officerChannel);
      case "Logger":
        return this.discord.client.channels.cache.get(config.discord.channels.loggingChannel);
      default:
        return this.discord.client.channels.cache.get(config.discord.channels.debugChannel);
    }
  }
}

module.exports = StateHandler;
