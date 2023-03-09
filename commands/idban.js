const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const db = require("croxydb")
const config = require("../config.js")
module.exports = {
    name:"idban",
    description: 'ID ile kullanıcı yasaklarsın!',
    type:1,
    options: [
        {
            name:"id",
            description:"Lütfen bir kullanıcı ID girin!",
            type:3,
            required:true
        },
        {
            name: "sebep",
            description: "Sebep belirt.",
            type: 3,
            required:true
        },
       
       
    ],
  run: async(client, interaction) => {
    const rol = config.yetkiverrol
    if(!interaction.member.roles.cache.has(rol)) return interaction.reply({content: "Yetkin Yok!", ephemeral: true})
    const id = interaction.options.getString('id')
    const sebep = interaction.options.getString('sebep')
  interaction.guild.members.ban(id).catch(() => {})
  const echopast = new EmbedBuilder()
  .setTitle("Başarıyla bir kullanıcıyı id ile banladın!")
  .setDescription("<@"+id+"> adlı kişiyi **"+sebep+"** sebebinden dolayı banladın.")
  .setColor("Red")
  interaction.reply({embeds: [echopast]})


  let log = config.banunbanlog
let channel = interaction.channel
let channel2 = client.channels.cache.get(log)
const echo = new EmbedBuilder()
.setAuthor({name: interaction.user.tag+" Adlı kişi bir kişiyi id ile banladı!", iconURL:  interaction.user.avatarURL({dynamic: true})})
.setDescription("<@"+id+"> adlı kişiyi banladı!\n\n```Sebep: "+sebep+"```")
.setColor("Red")
client.channels.cache.get(log).send({ embeds: [echo] }).catch((e) => { })

}

};
