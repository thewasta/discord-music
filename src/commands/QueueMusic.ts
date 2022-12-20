import {CommandInterface} from "../CommandInterface";
import {ApplicationCommandType, CommandInteraction} from "discord.js";
import {BotClient} from "../BotClient";
import {helper_check_channel} from "./index";

const QueueMusic: CommandInterface = {
    name: "queue",
    description: "Listado de canciones en cola",
    type: ApplicationCommandType.ChatInput,
    run: async (client: BotClient, interaction: CommandInteraction) => {
        const VoiceChannel = await helper_check_channel(interaction)
        let queue;
        if (VoiceChannel) {
            queue = client.distube.getQueue(VoiceChannel)
        }
        if (!queue) {
            await interaction.followUp({
                content: "No hay nada en cola",
                ephemeral: true,
            })
            return;
        }
        const q = queue.songs
            .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
            .slice(0, 5)
            .join("\n");
        await interaction.followUp({
            content: `Cola de reproducción:\n${q}\nTotal en cola: ${queue.songs.length}`,
            ephemeral: true
        })
    }
}
export default QueueMusic