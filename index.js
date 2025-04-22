const { GatewayIntentBits, Client } = require("discord.js");
const { token } = require('./config.json');
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { DisTube } = require("distube");
const play = require('./commands/play');
const { prefix } = require('./config.json');

let client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages
    ]
});

client.once('ready', () => {
    console.log('Logged in!');
});

client.distube = new DisTube(client, {
    emitAddListWhenCreatingQueue: true,
    emitAddSongWhenCreatingQueue: true,
    emitNewSongOnly: false,
    nsfw: false,
    joinNewVoiceChannel: true,
    savePreviousSongs: true,
    plugins: [new YtDlpPlugin()]
});


client.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'play') {
        play(client, message, args);
    }
    if (command === 'stop') {
        client.distube.stop(message.guild.id);
    }
    if(command === 'skip') {
        client.distube.skip(message.guild.id);
    }
});

client.login(token);