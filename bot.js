const Discord = require ("discord.js");
const ytdl = require('ytdl-core');
const ms = require("ms");
const YouTube = require('simple-youtube-api');
const GOOGLE_API_KEY = "AIzaSyDUmo-BtB5oQr5Y3RSgYYBMj9rFKMr-W2s";
const prefix = "sasuke";
const youtube = new YouTube(GOOGLE_API_KEY);
const queue = new Map();

var bot = new Discord.Client();
var servers = {};

bot.on("ready", function() {
    console.log("Ready");
    bot.user.setGame(`on ${bot.guilds.size} servers!`)
});

bot.on("message", async message => {
if (message.author.bot) return undefined;
	if (!message.content.startsWith(prefix)) return undefined;

    const args = message.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(message.guild.id);
    let messageArray = message.content.split(" ");
    let args2 = messageArray.slice(1);
    var args3 = message.content.substring(prefix.length).split(" ");

    switch (args3[0].toLowerCase()) {
        case "noob":  
        var E1 = new Discord.RichEmbed()
        .setColor("#15f153")
        .addField("Informatii: ", message.author.username + " este noob in proportie de " + r1[Math.floor(Math.random() * r1.length)])
        .setTimestamp();
        message.channel.sendMessage(E1); 
            break;     
        case "play":
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) {
            var E31 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Eroare", "Trebuie sa intri pe un Voice Channel ")
            .setTimestamp();
        return message.channel.send(E31);
        };;
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);  
                await handleVideo(video2, message, voiceChannel, true); 
            }
                var E31 = new Discord.RichEmbed()
                .setColor("#15f153")
                .addField("✅ Playlist:", `**${playlist.title}** a fost adaugata in playlist`)
                .setTimestamp();
            return message.channel.send(E31);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    let index = 0;
                    var E32 = new Discord.RichEmbed()
                .setColor("#15f153")
                .addField("Top 10 videoclipuri gasite:", `${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Scire pe chat numarul corespunzator videoclipului pe care vrei sa il asculti `)
                .setTimestamp();
                    message.channel.send(E32);
                    try {
                        var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                            maxMatches: 1,
                            time: 100000,
                            errors: ['time']
                        });
                    } catch (err) {
                        console.error(err);
                        var E33 = new Discord.RichEmbed()
                        .setColor("#15f153")
                        .addField("Eroare", "Timpul a expiart sau nu ai pus un numar")
                        .setTimestamp();
                         return message.channel.send(E33);
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    var E34 = new Discord.RichEmbed()
                    .setColor("#15f153")
                    .addField("Eroare", "Mention owener")
                    .setTimestamp();
                return message.channel.send(E34);
                }
            }
            return handleVideo(video, message, voiceChannel);
        }
            break;
        case "skip" :
        const voiceChannel2 = message.member.voiceChannel;
    if (!voiceChannel2) {
        var E31 = new Discord.RichEmbed()
        .setColor("#15f153")
        .addField("Eroare", "Trebuie sa intri pe un Voice Channel ")
        .setTimestamp();
    return message.channel.send(E31);
    };
    if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.')
		serverQueue.connection.dispatcher.end('Skip command has been used!')
        return undefined;
            break;
        case "stop" :
        if (!message.member.voiceChannel) {
            var E38 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Eroare", "Trebuie sa intri pe un Voice Channel ")
            .setTimestamp();
        return message.channel.send(E38);
        }
        if (!serverQueue) {
            var E40 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Eroare", "sasuke1.0 nu este pe un Voice Channel")
            .setTimestamp();
            return message.channel.send(E40);
        }
            serverQueue.songs = [];
        var server = servers[message.guild.id];
        if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
                var E39 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("sasuke1.0 s-a deconectat",":x:")
            .setTimestamp();
            message.channel.sendMessage(E39);       
            break;
        case "volume" :
        if (!message.member.voiceChannel) {
            var E41 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Eroare", "Trebuie sa intri pe un Voice Channel ")
            .setTimestamp();
        return message.channel.send(E41);
        }
		if (!serverQueue) {
            var E42 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Eroare", "sasuke1.0 nu este pe un Voice Channel")
            .setTimestamp();
            return message.channel.send(E42);
        }
        if (!args[1]) {
            var E40 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Volum:", `Volumul actiual este **${serverQueue.volume}**`)
            .setTimestamp();
            return message.channel.send(E40);
        }
		serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
        {
            var E40 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Volum:", `Volumul a fost setat la **${args[1]}**`)
            .setTimestamp();
            return message.channel.send(E40);
        }
            break;
        case "now-playing" :
        if (!serverQueue) {
            var E44 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Eroare", "Playlistul e gol")
            .setTimestamp();
            return message.channel.send(E44);
        }
            var E45 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Now playing:", `**${serverQueue.songs[0].title}**`);
            return message.channel.send(E45);
            break;
        case "playlist" :
        if (!serverQueue) {
            var E43 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Eroare", "Playlistul e gol")
            .setTimestamp();
            return message.channel.send(E43);
        }
        var E45 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("**Playlist:**", `${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
            
**Now playing:** ${serverQueue.songs[0].title}
                    `);
            return message.channel.send(E45);
            break;
        case "pause" :
        if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
                var E47 = new Discord.RichEmbed()
                .setColor("#15f153")
                .addField("Pause", ` ${serverQueue.songs[0].title} a fost pus pe pauza`)
                .setTimestamp();
                return message.channel.send(E47);
		}
            var E46 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Eroare", "CristalVic nu este pe un Voice Channel")
            .setTimestamp();
            return message.channel.send(E46);
            break;
        case "resume" :
        if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
            var E48 = new Discord.RichEmbed()
                .setColor("#15f153")
                .addField("Resume", `Se continua videoclipul ${serverQueue.songs[0].title}`)
                .setTimestamp();
                return message.channel.send(E48);
		}
        var E51 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Eroare", "CristalVic nu este pe un Voice Channel")
            .setTimestamp();
            return message.channel.send(E51);
            break;
        case "help" :
             var E8 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("sasukehelp-music", '> detalii despre partea legata de muzica')
            .addField("sasukehelp-divertisment", '> detalii despre partea legata de divertisment')
            .addField("Add sasuke1.0 on your server", '> https://discordapp.com/api/oauth2/authorize?client_id=450620841886220288&permissions=8&scope=bot')
            .setTimestamp();
            message.channel.sendMessage(E8);
            break;
        case "help-music" :
             var E9 = new Discord.RichEmbed()
             .setAuthor("CristlaVic",bot.user.avatarURL,'https://www.youtube.com/channel/UC6Bt4LtCecz3Zl2VGCsCYRA')
            .setColor("#15f153")
            .addField("sasukeplay ", '> Comanda pentru a asculta muzica')
            .addField("sasukeskip", '> Comanda pentru a da skip la urmatoarea pesa din playlist')
            .addField("sasukestop", '> Comanda pentru a opri Muzica')
            .addField("sasukevolume", '> Comanda pentru ajusta volumul botului muzica')
            .addField("sasukenow-playing", '> Comanda pentru a vedea ce melodie se reda')
            .addField("sasukepause", '> Comanda pentru a pune pe pauza muzica')
            .addField("sasukeresume", '> Comanda pentru a relua muzica')
            .setTimestamp();
            message.channel.sendMessage(E9);
            break;
        case "help-divertisment" : 
             var E10 = new Discord.RichEmbed()
             .setAuthor("CristlaVic",bot.user.avatarURL,'https://www.youtube.com/channel/UC6Bt4LtCecz3Zl2VGCsCYRA')
            .setColor("#15f153")
            .addField("sasukenoob", '> Iti arata cat de noob est')
            .addField("sasukenaruto", '> Iti arata cat % esti naruto')
            .setTimestamp();
            message.channel.sendMessage(E10);
            break;
        case "naruto":  
            var E17 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Sanse", message.author + " este naruto in proportie de " + r1[Math.floor(Math.random() * r1.length)])
            .setTimestamp();
            message.channel.sendMessage(E17); 
            break;     
        default:
        var T = new Discord.RichEmbed()
        .setColor("#15f153")
        .addField("Comanda invalida",'Incearca sasukehelp')
        .setTimestamp();
        message.channel.sendMessage(T); 
    }
});

var  r1 = [
    "0%",
    "1%",
    "2%",
    "3%",
    "4%",
    "5%",
    "6%",
    "7%",
    "8%",
    "9%",
    "10%",
    "11%",
    "12%",
    "13%",
    "14%",
    "15%",
    "16%",
    "17%",
    "18%",
    "19%",
    "20%",
    "21%",
    "22%",
    "23%",
    "24%",
    "25%",
    "26%",
    "27%",
    "28%",
    "29%",
    "30%",
    "31%",
    "32%",
    "33%",
    "34%",
    "35%",
    "36%",
    "37%",
    "38%",
    "39%",
    "40%",
    "41%",
    "42%",
    "43%",
    "44%",
    "45%",
    "46%",
    "47%",
    "48%",
    "49%",
    "50%",
    "51%",
    "52%",
    "53%",
    "54%",
    "55%",
    "56%",
    "57%",
    "58%",
    "59%",
    "60%",
    "61%",
    "62%",
    "63%",
    "64%",
    "65%",
    "66%",
    "67%",
    "68%",
    "69%",
    "70%",
    "71%",
    "72%",
    "73%",
    "74%",
    "75%",
    "76%",
    "77%",
    "78%",
    "79%",
    "80%",
    "81%",
    "82%",
    "83%",
    "84%",
    "85%",
    "86%",
    "87%",
    "88%",
    "89%",
    "90%",
    "91%",
    "92%",
    "93%",
    "94%",
    "95%",
    "96%",
    "97%",
    "98%",
    "99%",
    "100%"
  ]
var  r2 = [
  "https://imgur.com/a/3xIG8",
  "https://imgur.com/a/pjZro",
  "https://imgur.com/a/sY3aE",
  "https://imgur.com/a/QRjLf"
]
var r3 = [
   "https://imgur.com/vmpzDtf",
   "https://imgur.com/7tC1MM6",
   "https://imgur.com/XiWmj56",
   "https://imgur.com/pCxvnl8",
   "https://imgur.com/FYno1Lp",
   "https://imgur.com/CWeeruD",
   "https://imgur.com/dMO3Kdw",
   "https://imgur.com/LaQ9waz",
   "https://imgur.com/q2jrVlA",
   "https://imgur.com/kxqyOOS",
   "https://imgur.com/KKGF50i",
   "https://imgur.com/K2nBM1h",
   "https://imgur.com/TRAN6hf",
   "https://imgur.com/h8Ek4TR",
   "https://imgur.com/hWRsL29",
   "https://imgur.com/20js0PC",
   "https://imgur.com/7F7cfgP",
   "https://imgur.com/452j4UZ"
]

var  r4 = [
    "Da",
    "Nu",
    "Nu stiu",
    "Idk"
  ]
  
async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Discord.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
        else  {
        var E35 = new Discord.RichEmbed()
        .setColor("#15f153")
        .addField(":white_check_mark: Playlist:", `**${song.title}** a fost adougata in playlist`)
        .setTimestamp();
         return msg.channel.send(E35)
        }
	}
	return undefined;
}

function play(guild, song , message , channel) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    
        var E50 = new Discord.RichEmbed()
        .setColor("#15f153")
        .addField("Now Playing", `**${song.title}** `)
        .setTimestamp();
        serverQueue.textChannel.send(E50)
    }
bot.login(process.env.BOT_TOKEN);
