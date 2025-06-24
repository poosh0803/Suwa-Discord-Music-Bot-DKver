const { EmbedBuilder } = require('discord.js');
const https = require('https');

async function fetchDogImage() {
    return new Promise((resolve, reject) => {
        https.get('https://dog.ceo/api/breeds/image/random', (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.status === 'success') {
                        resolve(json.message); // image URL
                    } else {
                        reject('API returned error');
                    }
                } catch (err) {
                    reject('Error parsing dog API response');
                }
            });
        }).on('error', (err) => reject(err.message));
    });
}

async function dog(message) {
    try {
        const imageUrl = await fetchDogImage();

        const embed = new EmbedBuilder()
            .setColor(0xf1c40f)
            .setTitle('🐶 Woof!')
            .setImage(imageUrl)
            .setFooter({ text: `${message.author.username} requested a dog.` })
            .setTimestamp();

        await message.channel.send({ embeds: [embed] });
    } catch (err) {
        await message.channel.send(`🐾 Couldn't fetch a dog right now. Try again later.`);
        console.error('Dog error:', err);
    }
}

module.exports = dog;