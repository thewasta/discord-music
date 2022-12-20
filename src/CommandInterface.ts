import {ChatInputApplicationCommandData, CommandInteraction} from "discord.js";
import {BotClient} from "./BotClient";

export interface CommandInterface extends ChatInputApplicationCommandData {
    run: (client: BotClient, interaction: CommandInteraction) => void
}