const express = require('express');
const app = express();
const http = require('http');
    app.get("/",(request, response) => {
      console.log(`pingleme işlemi başarılı başarılıysa bu yazıyı loglarda görürsün`);
      response.sendStatus(200);
    });
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);



const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');




var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);



client.on('userUpdate', (o,n) => {
  var tag = "! ɴᴇᴘᴛᴜɴᴇ ★";
  var sunucuid = "761242621393764372";
  var tagialanlaraverilecek = "761242621410410531"
  var mesajkanalid = "761242622018584645"
  const embed1 = new Discord.RichEmbed()
    .setTitle("Tag Bildirimi")
    .setDescription(`${n}, tagımızı aldığı için rolü verildi!`)
    .setFooter("Developed by Neptune") //Değiştirme Lütfen 
    .setTimestamp()
    .setColor("GREEN")
  const embed2 = new Discord.RichEmbed()
    .setTitle("Tag Bildirimi")
    .setDescription(`${n}, tagımızı çıkardığı için rolü alındı!`)
    .setFooter("Developed by Neptune") //Değiştirme Lütfen 
    .setTimestamp()
    .setColor("RED")

  if(n.username !== o.username) {
    if(n.username.includes(tag)) { //eğer kullanıcı tagı almışsa
      if(!client.guilds.get(sunucuid).members.get(n.id).roles.has(tagialanlaraverilecek)) { //ve crew rolü yoksa
        client.guilds.get(sunucuid).members.get(n.id).addRole(tagialanlaraverilecek) // crew rolü ver
        client.channels.get(mesajkanalid).send(embed1) // bildirim kanalına mesaj yolla
      }
    }
    if(!n.username.includes(tag)) { //eğer kullanıcı tagı çıkarmışsa
      if(client.guilds.get(sunucuid).members.get(n.id).roles.has(tagialanlaraverilecek)) { //ve crew rolü varsa
        client.guilds.get(sunucuid).members.get(n.id).removeRole(tagialanlaraverilecek) // crew rolünü al
        client.channels.get(mesajkanalid).send(embed2) //bildirim kanalına mesaj yolla
      }
    }
  }
})














client.on("guildMemberAdd", member => {
if(member.guild.id !== "761242621393764372") return; //tırnak işareti arasına sunucu id
let eskiNick = member.user.username;
const id = "761242622018584639" //Kanal id
const channel  = member.guild.channels.get(id);
channel.send("<@"+member.user.id+"> sunucuya giriş yaptı!\nOnunla **"+member.guild.members.size+"** kişiyiz!");
});

