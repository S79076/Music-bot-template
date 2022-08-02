const { Client, Discord, MessageEmbed } = require("discord.js");
const { Collection } = require("discord.js");
const client = new Client({intents: 32767});
const { Database } = require("./config.json");
const { Token } = require("./config.json");
const embed = new MessageEmbed()
const { nodes, SpotifyClientID, SpotifySecret } = require("./config.json")
const Deezer = require("erela.js-deezer");
const Spotify = require("better-erela.js-spotify").default;
const Apple = require("better-erela.js-apple").default;
const { Manager } = require("erela.js");


client.commands = new Collection();
client.cooldowns = new Collection();

client.on('ready', async () => {
    const mainGuild = await client.guilds.cache.get("417939816450228225");
    mainGuild.commands.set(CommandsArray);
});

require("./Handlers/Events")(client);
require("./Handlers/Slash")(client);

client.manager = new Manager({
    nodes,
    plugins: [
        new Spotify({
            clientID: SpotifyClientID,
            clientSecret: SpotifySecret,
        }),
        new Apple(),
        new Deezer(),
    ],
    send: (id, payload) => {
        let guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    },
});
module.exports = client;

client.login(Token);