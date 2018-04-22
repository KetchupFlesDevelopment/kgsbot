const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");

client.on("ready", () => {
  console.log(`The official GSNHP discord bot has been enabled!`); 
  client.user.setActivity(`play.gsnhp.eu!`);
});


client.on("message", async message => {
  if(message.author.bot) return;
  
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  
  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }
  
  if(command === "kick") {
    if(!message.member.roles.some(r=>["Administrator", "Owner", "Moderator"].includes(r.name)) )
      return message.reply("You need more rights to use this command!");
    
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "You have been expelled from Hogwarts!";
    
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
      let serverembed = new Discord.RichEmbed()
      .setColor("#efd74f")
      .addField(`${member.user.tag}`, `has been kicked!\n** **`)
      .addField("Kicked by:", `** **${message.author.tag}\n** **`)
      .addField("Reason:", `** **${reason}`)
      message.channel.send(serverembed);

  }
  
  if(command === "ban") {
    if(!message.member.roles.some(r=>["Administrator", "Owner"].includes(r.name)) )
      return message.reply("You need more rights to use this command!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "You have been expelled from Hogwarts!";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    let serverembed = new Discord.RichEmbed()
    .setColor("#efd74f")
    .addField(`${member.user.tag}`, `has been banned!\n** **`)
    .addField("Banned by:", `** **${message.author.tag}\n** **`)
    .addField("Reason:", `** **${reason}`)
    message.channel.send(serverembed);
  }
  
  if(command === "help") {
    let serverembed = new Discord.RichEmbed()
    .setColor("#efd74f")
    .addField("GSNHP Bot | Help page", "All commands are listed below!\n** **")
    .addField("Information commands", "!ping - ping pong!\n** **")
    .addField("Staff commands", "!kick @user <reason> - Kick those naughty users!\n!ban @user <reason> - Ban those naughty users!\n** **")
    .setFooter("GSNHP Bot by @KetchupFles | DEV#6080, All rights reserved!");
    message.channel.send(serverembed);
  }

  if(command === "invite") {
    message.delete().catch(O_o=>{}); 
    message.channel.send("Invite people with this link: https://discord.io/GSNHP, or with this QR Code:", {
    file: "images/qr.jpg"});
  }
});

client.login(process.env.BOT_TOKEN);
           
