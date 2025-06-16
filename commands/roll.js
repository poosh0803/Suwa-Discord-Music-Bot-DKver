const { AttachmentBuilder } = require('discord.js');
const path = require('path');

const outcomes = [
    { name: '笑筊', image: '../images/roll/v1/00.png' },
    { name: '聖筊', image: '../images/roll/v1/01.png' },
    { name: '陰筊', image: '../images/roll/v1/11.png' },
];

async function roll(message) {
    const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
    const imagePath = path.join(__dirname, randomOutcome.image);
    const attachment = new AttachmentBuilder(imagePath);

    await message.channel.send({
        content: `🎲 ${message.author} 擲筊: **${randomOutcome.name}**`,
        files: [attachment],
    });
};

// async function roll(message) {
//     const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
//     const imagePath = path.join(__dirname, randomOutcome.image);
//     const attachment = new AttachmentBuilder(imagePath);

//     const embed = new EmbedBuilder()
//         .setColor(0x00AE86)
//         .setAuthor({
//             name: `${message.author.username} 擲筊`,
//             iconURL: message.author.displayAvatarURL(),
//         })
//         .setTitle(`🎲 結果: **${randomOutcome.name}**`) // Bold formatting works here
//         .setImage(`attachment://${path.basename(imagePath)}`)
//         .setTimestamp();

//     await message.channel.send({
//         embeds: [embed],
//         files: [attachment],
//     });
// }

module.exports = roll;