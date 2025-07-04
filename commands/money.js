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
            // Try to extract payer, amount, receiver
            const match = instr.match(/^(\w+) pays \$(\d+\.?\d*) to (\w+)$/);
            if (match) {
                const payer = `**${match[1]}**`;
                const amount = `**$${match[2]}**`;
                const receiver = `**${match[3]}**`;
                desc += `• ${payer} pays `;
                desc += `\u001b[32m${amount}\u001b[0m to ${receiver}\n`;
            } else {
                desc += `• ${instr}\n`;
            }
        }
        desc += '\n**Final Status:**\n';
        // Final Contribution with colored balances
        for (const line of data.finalContribution) {
            // Try to extract name, contributed, final
            const match = line.match(/^(\w+): contributed \$(\d+\.?\d*) → final contribution \$(\-?\d+\.?\d*)$/);
            if (match) {
                const name = `**${match[1]}**`;
                const contributed = `$${match[2]}`;
                const final = parseFloat(match[3]);
                let finalStr = '';
                if (final < 0) {
                    finalStr = `**\u001b[31m$${final.toFixed(2)}\u001b[0m**`;
                } else {
                    finalStr = `**\u001b[32m$${final.toFixed(2)}\u001b[0m**`;
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
            const sign = amount > 0 ? '+' : '';
            desc += `${name}: ${sign}${amount}\n`;
        }

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
