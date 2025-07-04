const { EmbedBuilder } = require('discord.js');
const http = require('http');
const https = require('https');

async function fetchMoneyData() {
    return new Promise((resolve, reject) => {
        // TODO: Replace with your actual API endpoint
        const url = 'http://127.0.0.1:3300/api/discord';
        const client = url.startsWith('https') ? https : http;
        client.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json);
                } catch (err) {
                    reject('Error parsing API response');
                }
            });
        }).on('error', (err) => reject(err.message));
    });
}

async function money(message) {
    try {
        const data = await fetchMoneyData();
        // Payment Instructions
        let desc = '**Payment Instructions:**\n';
        for (const instr of data.paymentInstructions) {
            const match = instr.match(/^(\w+) pays \$(\d+\.?\d*) to (\w+)$/);
            if (match) {
                const payer = `**${match[1]}**`;
                const amount = parseFloat(match[2]);
                const amountStr = amount > 0 ? `🟢**$${amount.toFixed(2)}**` : `🔴**$${amount.toFixed(2)}**`;
                const receiver = `**${match[3]}**`;
                desc += `• ${payer} pays ${amountStr} to ${receiver}\n`;
            } else {
                desc += `• ${instr}\n`;
            }
        }
        desc += '\n**Final Status:**\n';
        for (const line of data.finalContribution) {
            const match = line.match(/^(\w+): contributed \$(\d+\.?\d*) → final contribution \$(\-?\d+\.?\d*)$/);
            if (match) {
                const name = `**${match[1]}**`;
                const contributed = `$${match[2]}`;
                const final = parseFloat(match[3]);
                let finalStr = '';
                if (final < 0) {
                    finalStr = `🔴**$${final.toFixed(2)}**`;
                } else {
                    finalStr = `🟢**$${final.toFixed(2)}**`;
                }
                desc += `${name}: contributed ${contributed} → final balance ${finalStr}\n`;
            } else {
                desc += `${line}\n`;
            }
        }
        desc += '\n**Descriptions:**\n';
        for (const [name, d] of Object.entries(data.descriptions)) {
            desc += `${name}: ${d}\n`;
        }
        desc += '\n**Balance Change:**\n';
        for (const [name, amount] of Object.entries(data.balanceChange)) {
            let sign = amount > 0 ? '+' : '';
            let colorEmoji = amount > 0 ? '🟢' : '🔴';
            desc += `${name}: ${colorEmoji}${sign}${amount}\n`;
        }
        desc += '\n[More info](https://money.dkpoosh.com)';

        const embed = new EmbedBuilder()
            .setColor(0x3498db)
            .setTitle('Money Data')
            .setDescription(desc)
            .setTimestamp();

        await message.channel.send({ embeds: [embed] });
    } catch (err) {
        await message.channel.send('Failed to fetch money data.');
        console.error('Money error:', err);
    }
}

module.exports = money;
