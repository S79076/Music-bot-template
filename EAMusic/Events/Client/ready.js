const { Client, MessageEmbed, Discord } = require("discord.js");
const mongoose = require("mongoose");
const { Database } = require("../../config.json");
module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client 
     */
    execute(client) {
        
        client.manager.init(client.user.id);
        console.log(`✔ ${client.user.username} is Online for ${client.users.cache.size} Members`)
        client.user.setActivity(`Youtube Music`, {type: "LISTENING"})

        if(!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() =>{
            console.log(`${client.user.username} has connected to MongoDB database`)
        }).catch((err) =>{
            console.log(err)
        });
    }
}