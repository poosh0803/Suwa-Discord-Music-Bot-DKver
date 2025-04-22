function addSong(client) {
    client.distube.on('addSong', (queue, song) => {
        let name = song.name;
        let formattedDuration = song.formattedDuration;
        let textChannel = queue.textChannel;
        textChannel.send(`***Đã thêm: ${name} - ${formattedDuration} vào hàng chờ***`);
    })
}

module.exports = addSong;