const {intializeLang} = require("./langManager");
intializeLang('en_us'); //change this to en_us to display English :wink:


const { GatewayIntentBits, Client } = require("discord.js");
const { token } = require('./config.json');
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { DisTube, RepeatMode } = require("distube");
const { prefix } = require('./config.json');
const { cookies } = require("./config.json");
const repeat = require("./commands/repeat");
const playSong = require("./events/playSong");
const addSong = require("./events/addSong");
const play = require('./commands/play');
const skip = require('./commands/skip');
const queue = require('./commands/queue');
const stop = require('./commands/stop');
const roll = require('./commands/roll');
const cat = require("./commands/cat");
const dog = require("./commands/dog");
const pick = require("./commands/pick");
const money = require("./commands/money");


var repeatMode = 0;

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
    plugins: [
        new YtDlpPlugin({
      cookies: cookies,
      update: false,
      exec: 'yt-dlp',
      streamOptions: {
        highWaterMark: 1 << 25 // 32 MB buffer
      }
    })
    ]
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
            stop(client, message)
            break;
        case 'skip':
            skip(client, message);
            break;
        case 'queue':
            queue(client, message);
            break;
        case 'repeat':
            repeatMode++;
            if(repeatMode > 2) {
                repeatMode = 0;
            }
            repeat(client, message.guildId, repeatMode, message)
            break;
        case 'roll':
            roll(message, args);
            break;
        case 'pick':
            pick(message, args);
            break;
        case 'cat':
            cat(message);
            break;
        case 'dog':
            dog(message);
            break;
        case 'money':
            money(message);
            break;
        default:
            break;
    }
    // Try to delete the user's command message
    try {
      message.delete();
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
});

playSong(client);
addSong(client);

client.login(token);