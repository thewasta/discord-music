import {CommandInterface} from "../CommandInterface";
import {ApplicationCommandType, CommandInteraction} from "discord.js";
import {BotClient} from "../BotClient";
import {helper_check_channel} from "./index";

const SkipMusic: CommandInterface = {
    name: "skip",
    description: "Play next music",
    type: ApplicationCommandType.ChatInput,
    run: async (client: BotClient, interaction: CommandInteraction) => {
        const VoiceChannel = await helper_check_channel(interaction)
        let queue;
        if (VoiceChannel) {
            queue = client.distube.getQueue(VoiceChannel);
        }

        if (!queue) {
            await interaction.followUp({
                content: "No hay canción después de ésta.",
                ephemeral: true
            })
            return;
        }

        try {
            if (queue.songs.length <= 1){
                await interaction.followUp({
                    content: "No hay más canciones después de la actual.",
                    ephemeral: true
                })
                return;
            }
            const song = await queue.skip();
            await interaction.followUp({
                content: `Reproduciendo: ${song.name}  `,
                ephemeral: true
            })
        } catch (e) {
            await interaction.followUp({
                content: `No sabemos qué ha pasado. Pero vuelve intentarlo a ver si hay suerte`,
                ephemeral: true
            })
            console.error(e)
        }
    }
}
export default SkipMusic;