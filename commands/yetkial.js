const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const config = require("../config.js")
module.exports = {
    name:"yetkial",
    description: 'Birinin yetkisini alırsın!',
    type:1,
    options: [
        {
            name:"user",
            description:"Rolü alınacak kişiyi seçin!",
            type:6,
            required:true
        },
       
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: "Adminstrator Yetkin Yok!", ephemeral: true})
    const user = interaction.options.getMember('user')
    const rol = config.yetkiverrol
    interaction.guild.members.cache.get(user.id).roles.remove(rol)
    const echopast = new EmbedBuilder()
    .setTitle("Başarıyla bir kullanıcının yetkisini aldın!")
    .setDescription("<@"+user+"> adlı kişinin yetkisini aldın!")
    .setColor("Gold")
    interaction.reply({embeds: [echopast]})

let log = config.yetkilog
let channel = interaction.channel
let channel2 = client.channels.cache.get(log)
const echo = new EmbedBuilder()
.setAuthor({name: interaction.user.tag+" Adlı kişi bir kişinin yetkisini aldı!", iconURL:  interaction.user.avatarURL({dynamic: true})})
.setDescription("<@"+user+"> adlı kişinin yetkisini aldı.")
.setColor("Gold")
client.channels.cache.get(log).send({ embeds: [echo] }).catch((e) => { })
}
}