import {config} from "dotenv";
import path from "path";
import process from "node:process";
import ready from "./listener/ready";
import interactionCreate from "./listener/interactionCreate";
import {BotClient} from "./BotClient";

config({
    path: path.join(__dirname, "..", ".env")
})

const token = process.env.DISCORD_TOKEN

export const client: BotClient = new BotClient()

ready(client)
interactionCreate(client)

client.login(token)
    .then(_ => console.log("IM READY"))
    .catch(console.error)

const exit_codes = [`SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`]
// exit_codes.forEach((eventType) => {
//     process.on(eventType, (options, exitCode) => {
//         if (!client.application) return;
//         let commands = client.application.commands.cache
//         for (const command of commands) {
//             let command_id = command[1].id
//             client.application.commands.fetch(command_id)
//                 .then((command: ApplicationCommand) => {
//                     console.log(`${command.name} command removed`)
//                     command.delete()
//                         .catch(e => console.log("ERROR AL BORRAR COMANDO"))
//                 })
//         }
//     });
// })


