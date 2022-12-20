import {CommandInterface} from "../CommandInterface";
import {ApplicationCommandType, CommandInteraction} from "discord.js";
import {BotClient} from "../BotClient";
import {helper_check_channel} from "./index";

const LeaveMusic: CommandInterface = {
    name: "leave",
    description: "Abandonar el chat de voz actual",
    type: ApplicationCommandType.ChatInput,
    run: async (client: BotClient, interaction: CommandInteraction) => {
        const v = await helper_check_channel(interaction)
        if (v) {
            client.distube.voices.leave(v)
            await interaction.followUp({
                content: "Cya soon",
                ephemeral: true
            })
        }
    }
}
export default LeaveMusic;