const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const config = require("../config.js")
module.exports = {
    name:"ban",
    description: 'Kullanıcıyı Sunucudan Yasaklarsın.',
    type:1,
    options: [
        {
            name:"user",
            description:"Yasaklanıcak Kullanıcıyı Seçin.",
            type:6,
            required:true
        },
        {
            name:"reason",
            description:"Hangi Sebepten dolayı yasaklanıcak?",
            type:3,
            required:true
        },
    ],
  run: async(client, interaction) => {
    const rol = config.yetkiverrol
    if(!interaction.member.roles.cache.has(rol)) return interaction.reply({content: "Yetkin Yok!", ephemeral: true})
    const user = interaction.options.getMember('user')
    const sebep = interaction.options.getString('reason')
    if(user.permissions.has(rol)) return interaction.reply({content:"Bu Kullanıcının Ban Yetkisi Olduğu İçin Onu Yasaklayamadım.   ",ephemeral:true})
    user.ban({reason: sebep});
    const echopast = new EmbedBuilder()
    .setTitle("Başarıyla bir kullanıcıyı banladın!")
    .setDescription("<@"+user+"> adlı kişiyi **"+sebep+"** sebebinden dolayı banladın.")
    .setColor("Red")
    interaction.reply({embeds: [echopast]})


let log = config.banunbanlog
let channel = interaction.channel
let channel2 = client.channels.cache.get(log)
const echo = new EmbedBuilder()
.setAuthor({name: interaction.user.tag+" Adlı kişi bir kişiyi banladı!", iconURL:  interaction.user.avatarURL({dynamic: true})})
.setDescription("<@"+user+"> adlı kişiyi banladı!\n\n```Sebep: "+sebep+"```")
.setColor("Red")
client.channels.cache.get(log).send({ embeds: [echo] }).catch((e) => { })


}
};
