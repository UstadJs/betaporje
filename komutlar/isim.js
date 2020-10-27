const Discord = require("discord.js");
const db = require('quick.db');
exports.run = (client, message, args) => {
  const log = message.guild.channels.find(c => c.id === "720382356523057275"); //buraya kayıt log id koyun
  const tag = "ꏪ";//YAZMAK İSTERSENİZ TAGINIZ ( BOŞ BIRAKABİLİRSİNİZ )
  const dogrulandi = client.emojis.find(emoji => emoji.name === "onayisareti");
  if(!message.member.roles.array().filter(r => r.id === "720382228479344741")[0]) { //buraya kayıt sorumlusu rolünün id'sini giriniz. SUNUCU AYARLARINDAN kopyalayın.
    return message.channel.send("Bu işlemi sadece Ayarlanmış Kayıt Sorumluları gerçekleştirebilir.");
  } else {
    let member = message.mentions.users.first() || client.users.get(args.join(' '))
      if(!member) return message.channel.send("Bir kullanıcı girin.")
    const c = message.guild.member(member)
    const isim = args[1];
    const yas = args[2];
      if(!isim) return message.channel.send("Bir isim girin.")
      if(!yas) return message.channel.send("Bir yaş girin.")
    c.setNickname(`${tag} ${isim} ' ${yas}`)
    const embed = new Discord.RichEmbed()
    .setDescription(`**<a:ops:718446118345769051> <@${c.user.id}>** kişinin yeni adı **${tag} ${isim} ' ${yas} !**`)
    .setColor("0xf3f5a7")
    log.send(embed)
    message.react(dogrulandi)
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["i", "nick"],
  permLevel: 0
};
exports.help = {
  name: "nick", 
  name: "isim",
  description: "",
  usage: ""
};
   