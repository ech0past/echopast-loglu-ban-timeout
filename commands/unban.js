const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const config = require("../config.js")
module.exports = {
    name:"unban",
    description: 'Kullanıcının Yasağını Kaldırırsın!',
    type:1,
    options: [
        {
            name:"id",
            description:"Kullanıcı ID Girin!",
            type:3,
            required:true
        },
    ],
  run: async(client, interaction) => {
    const rol = config.yetkiverrol
    if(!interaction.member.roles.cache.has(rol)) return interaction.reply({content: "Yetkin Yok!", ephemeral: true})
    const user = interaction.options.getString('id')
    
    interaction.guild.members.unban(user)

    const echopast = new EmbedBuilder()
    .setTitle("Başarıyla bir kullanıcının banını açtın!")
    .setDescription("<@"+user+"> adlı kişinin banını başarıya açtın.")
    .setColor("Red")
    interaction.reply({embeds: [echopast]})

let log = config.banunbanlog
let channel = interaction.channel
let channel2 = client.channels.cache.get(log)
    const echo = new EmbedBuilder()
    .setAuthor({name: interaction.user.tag+" Adlı kişi birisinin banını açtı!", iconURL:  interaction.user.avatarURL({dynamic: true})})
    .setDescription("<@"+user+"> adlı kişinin banını açtı!")
    .setColor("Green")
client.channels.cache.get(log).send({ embeds: [echo] }).catch((e) => { })
}
}