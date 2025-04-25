
<!-- PROJECT LOGO -->
<br />
<div align="center" id="readme-top">
  <h3 align="center"><img src="https://i.imgur.com/yMO2AFv.png" width="250"/></h3>
    <h3 align="center">Suwa Discord Bot</h3>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">Introduction</a>
      <ul>
        <li><a href="#built-with">Dependencies</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## Suwa Discord Bot

Suwa Discord Bot is my small project, the purpose that I created this bot is to learn and reasearch about NodeJS and Discord.js (Of course I am new to this).Suwa allows you to play music from a YouTube URL or search for a song directly using commands. Thanks to <a href="https://github.com/skick1234/DisTube">Distube</a>, managing and playing music has been made much easier. You could suport the developers with a coffee.  The bot is still in development, and more features may be added in the future, such as support for Spotify, SoundCloud, and more. Stay tuned!

### Dependencies

These following packages are supporting me to make this project:

* <a href="https://github.com/skick1234/DisTube">Distube</a>
* <a href="https://www.npmjs.com/package/@distube/ytsr">distube/ytsr</a>
* <a href="https://www.npmjs.com/package/@distube/yt-dlp">distube/yt-dlp</a>




<p align="right">(<a href="#readme-top">Go to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v20.18.1 or higher is recommended)
- [FFmpeg](https://ffmpeg.org/) (must be available in your system PATH)

In addition, make sure to follow the [discord.js documentation](https://discord.js.org) and the [official setup guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) to properly create your bot and retrieve your bot token, which is required for this project to work.

### Installation

_Following these steps in order to setup the bot properly:_


1. To get started, clone or download the repository:
   ```sh
   git clone https://github.com/HoangMen1902/Suwa-Discord-Music-Bot.git
   ```
2. Open the Project directory and run in terminal:
   ```sh
   npm i
   ```
3. Create a file named `config.json` in the root directory then modify it, example:
   ```json
    {
        "token": "your_discord_bot_token",
        "prefix": "!" //change to anything you want
    }
    ```
   
4. Setting Languages (Optional)  
Go into `index.js` and modify this line below to change languages  
<img src="https://i.imgur.com/bYKno7C.png">  
Currently, English and Vietnamese are supported. You can make your own lang file inside of the `lang` folder.

---

5. Run the bot

At the root directory, run:

```sh
node index.js
# or
npm run start
```
   
<p align="right">(<a href="#readme-top">Go to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">Go to top</a>)</p>



  