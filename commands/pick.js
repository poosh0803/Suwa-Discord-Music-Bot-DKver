const { AttachmentBuilder } = require('discord.js');
const path = require('path');


async function pick(message, args) {
    if (args.length < 2) {
        return message.reply('❗ Please provide at least 2 choices, like:\n`!pick option1 option2 [option3 ...]`');
    }

    const choice = args[Math.floor(Math.random() * args.length)];

    const embed = new EmbedBuilder()
        .setColor(0x3498db)
        .setTitle(`🎯 ${message.author.username}, I choose:`)
        .setDescription(`**${choice}**`)
        .setFooter({ text: `From ${args.length} choices` })
        .setTimestamp();

    await message.channel.send({ embeds: [embed] });

};
module.exports = pick;