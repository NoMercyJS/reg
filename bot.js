const Discord = require("discord.js");
const _client = new Discord.Client({ fetchAllMembers: true });
const client = global.client = _client
const config = require("./config.json");
const db = require('quick.db');
const fs = require("fs");
const prefix = config.Prefix;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdirSync("./commands").filter(file => file.endsWith(".js")).forEach(file => {
    let command = require(`./commands/${file}`);
    client.commands.set(command.conf.command, command);
    console.log(`[Command] ${file.replace(".js", "")} command loaded.`);
    command.conf.aliases.forEach(aliases => {
    client.aliases.set(aliases, command)  
  })
});

fs.readdirSync("./events").filter(file => file.endsWith(".js")).forEach(file => {
    let event = require(`./events/${file}`);
    client.on(event.conf.event, event.execute);
    console.log(`[Event] ${file.replace(".js", "")} event loaded.`);
});
  
client.sayilariCevir = function(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//----------------------------------------------------------------------------------------------------------------------------------------------------------\\

client.on('message', async message => {
  if (message.content === 'fakekatıl') { // Buraya ne yazarsanız yazdığınız şeye göre çalışır
    client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
      }
  });

//----------------------------------------------------------------------------------------------------------------------------------------------------------\\

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = '★'
  const sunucu = '817318032807559178'
  const log = '817318039267704893'
  const rol = '817318032945709067'

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(log).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolü Verildi.`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`${newUser.username}, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolü Sana Verildi!`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(log).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolü Alındı.`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`**${newUser.username}**, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolü Senden Alındı!`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});

//----------------------------------------------------------------------------------------------------------------------------------------------------------\\

client.on('guildMemberAdd', async (member) => {

  let viruskanal = client.channels.cache.get("818802120740438036")

  let virususer = client.users.cache.get(member.id);
  let viruskullanıcı = client.users.cache.get(member.id)
  const virushesapkurulus = new Date().getTime()- viruskullanıcı.createdAt.getTime();
  let viruj;
  if (virushesapkurulus < 1296000000) viruj = 'Bu Hesabın sahibi Güvenilir Değil!'
  if (virushesapkurulus > 1296000000) viruj = 'Bu Hesabın Sahibi Güvenilir!'

    const hgembed = new Discord.MessageEmbed()
    .setDescription(`
    
     ★ **Aramıza Hoşgeldin ${virususer.username} !**
  
     ★ **Seninle Birlikte ${member.guild.memberCount} Kişi olduk !**
  
     ★ **<@&817318032954884101> yetkililer Seninle Kısa Zamanda İlgilenicektir.**
  
     ★ **İsmini Ve Yaşını Yazıp Kayıt Olabilirsin.**

     ★ **Hesabın Kuruluş Tarihi ${moment(member.user.createdAt).format("__DD MMMM YYYY hh:mm:ss__") }**
  
     ★ **Hesabın Güvenlik Durumu: ${viruj}**
  
     ★ **Tag \`(★)\` alıp veya boost basarak kaydını oluşturabilirsin !**
    
    `)
    .setColor("#2f3136")
    .setImage("https://cdn.discordapp.com/attachments/522469528505155584/819282712191565885/d338958ff2bc814159af16dffa99bf00.gif")
    .setTitle("ATHANASIA'YA HOSGELDIN !")
    .setTimestamp()
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setAuthor(member.guild.name,member.guild.iconURL({dynamic:true}))
    .setFooter("Mercy was here")
    viruskanal.send(`<@&817318032954884101> & <@&817318032954884100> <@${member.id}>`, hgembed) ;
  })

//----------------------------------------------------------------------------------------------------------------------------------------------------------\\


  client.login(config.Token).then(c => console.log(`Logged in as ${client.user.tag}!`)).catch(err => console.error(`Failed to login to the bot!`));
