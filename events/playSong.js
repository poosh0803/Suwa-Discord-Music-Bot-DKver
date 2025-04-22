function playSong(client) {
    client.distube.on('playSong', (queue, song) => {
        let name = song.name;
        let formattedDuration = song.formattedDuration;
        let textChannel = queue.textChannel;
        textChannel.send(`***Bắt đầu phát: ${name} - ${formattedDuration}***`);
    })

}

module.exports = playSong;