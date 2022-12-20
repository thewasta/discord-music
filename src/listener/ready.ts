import {ActivityType} from "discord.js";
import {CommandHandler} from "../CommandHandler";
import {BotClient} from "../BotClient";

export default (client: BotClient): void => {
    client.on("ready", async () => {
        if (!client.user || !client.application) return;

        await client.user.setPresence({
            status: "online",
            activities: [
                {
                    name: "DJ",
                    type: ActivityType.Playing
                }
            ]
        })

        await client.application.commands.set(CommandHandler)
        console.log(`${client.user.tag} IS ONLINE`);
    })
}