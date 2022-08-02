const { Perms } = require("../Validation/Permissions");
const { Client, Discord, MessageEmbed } = require("discord.js");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
const { readdirSync } = require("fs");

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    const Table = new Ascii("Slash Commands Loaded")

    CommandsArray = [];

    (await PG(`${process.cwd()}/Commands/SlashCommands/*.js`)).map(async (file) => {
        const command = require(file);

        if(!command.name)
        return Table.addRow(file.split("/")[7], "❌ FAILED", "Missing a name.")

        if(!command.name)
        return Table.addRow(command.name, "❌ FAILED", "Missing a description.")

        if (command.permission) {
			if (Perms.includes(command.permission))
				command.defaultPermission = false;
			else
				return Table.addRow(command.name, '🔸 FAILED', 'Permission is invalid');
		}

        client.commands.set(command.name, command);
        CommandsArray.push(command);

        await Table.addRow(command.name, "✅ SUCESSFUL");

    });

    console.log(Table.toString());

    // Permissions Check

    client.on('ready', async () => {
        const mainGuild = await client.guilds.cache.get("417939816450228225");
        mainGuild.commands.set(CommandsArray);
    });


    
}