const { GatewayIntentBits, Client } = require("discord.js");
const { token } = require('./config.json');
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { DisTube } = require("distube");
const { prefix } = require('./config.json');
const { YouTubePlugin } = require("@distube/youtube");
const { cookies } = require("./config.json");
const playSong = require("./events/playSong");
const addSong = require("./events/addSong");
const play = require('./commands/play');
const skip = require('./commands/skip');

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
    emitAddListWhenCreatingQueue: false,
    emitAddSongWhenCreatingQueue: false,
    emitNewSongOnly: false,
    nsfw: false,
    joinNewVoiceChannel: true,
    savePreviousSongs: true,
    plugins: [new YtDlpPlugin({ cookies: cookies }), new YouTubePlugin({ cookies: cookies })]
});

client.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    switch (command) {
        case 'play':
            play(client, message, args);
            break;
        case 'stop':
            client.distube.stop(message.guild.id);
            break;
        case 'skip':
            skip(client, message);
            break;
        case 'queue':
            let queue = client.distube.getQueue(message.guild.id).songs;
            let songList = queue.map((song, index) => {
                return `${index + 1}. ${song.name} - ${song.formattedDuration}`;
            }).join('\n');

            message.channel.send(`***Danh sách bài hát hiện tại:\n${songList}***`);
            break;
        default:
            break;
    }
});

playSong(client);
addSong(client);

client.login(token);