const { AttachmentBuilder } = require('discord.js');
const path = require('path');

const outcomes = [
    { name: 'Outcome 1', image: '../images/roll/00.png' },
    { name: 'Outcome 2', image: '../images/roll/01.png' },
    { name: 'Outcome 3', image: '../images/roll/11.png' },
];

async function roll(message) {
    const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
    const imagePath = path.join(__dirname, randomOutcome.image);
    const attachment = new AttachmentBuilder(imagePath);

    await message.channel.send({
        content: `🎲 You rolled: **${randomOutcome.name}**`,
        files: [attachment],
    });
};

module.exports = roll;