const Discord = require("discord.js");
const db = require('quick.db');
exports.run = (client, message, args) => {
  const kayıtlı = message.guild.roles.find(r => r.id === "765519751228686357"); //buraya erkek rolünüzün id'sini koyun
  const misafir = message.guild.roles.find(r => r.id === "765519847274577932"); //buraya misafir rolünüzün id'sini koyun.
  const log = message.guild.channels.find(c => c.id === "765533933491453982"); //buraya kayıt log id koyun
  const tag = "★";
  if(!message.member.roles.array().filter(r => r.id === "765522336417447966")[0]) { //buraya kayıt sorumlusu rolünün id'sini giriniz. SUNUCU AYARLARINDAN kopyalayın.
    return message.channel.send("Bu işlemi sadece Ayarlanmış Kayıt Sorumluları gerçekleştirebilir.");
  } else {
    let member = message.mentions.users.first() || client.users.get(args.join(' '))
      if(!member) return message.channel.send("Bir kullanıcı girin.")
    const c = message.guild.member(member)
    const nick = args[1];
      if(!nick) return message.channel.send("Bir isim girin.")

    c.addRole(kayıtlı)
    c.removeRole(misafir)
    c.setNickname(`${tag} ${nick}`)
    const embed = new Discord.RichEmbed()
    .setAuthor("Kayıt Başarılı")
    .addField(`**Kayıt Edilen Kullanıcı :**` , `<@${c.user.id}>`)
    .addField(`**Kayıt İşleminde Verilen Rol :**`, `<@&765519751228686357>`)
    .addField(`**Yeni isim :**` , `${tag} ${nick} `)
    .setColor("#0add8e6")
    .setThumbnail(c.user.avatarURL)
    .setFooter(message.author.tag ,message.author.avatarURL);
    log.send(embed)
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["erkek"],
  permLevel: 0
};
exports.help = {
  name: "e",
  description: "e",
  usage: "e"
};
//rixnux-code