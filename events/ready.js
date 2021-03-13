const Discord = require("discord.js");
const client = global.client;

exports.execute = async () => {
    client.user.setPresence({ activity: { name: "★ Mercy Athanasia'yı Seviyor <3"}, status: "online" });
};

exports.conf = {
  event: "ready"
};