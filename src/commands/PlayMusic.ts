import {CommandInterface} from "../CommandInterface";
import {
    ApplicationCommandType,
    ApplicationCommandOptionType,
    CommandInteraction
} from "discord.js";
import {BotClient} from "../BotClient";
import {helper_check_channel} from "./index";

const PlayMusic: CommandInterface = {
    name: "play",
    description: "Añadir canción",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "search",
            description: "Pega la URL o el nombre de una canción de YT, Spotify, SoundCloud ",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (client: BotClient, interaction: CommandInteraction) => {
        const {member} = interaction;

        const VoiceChannel = await helper_check_channel(interaction)
        const query = interaction.options.get("search")?.value as string;
        try {
            const cache_channels = interaction.guild?.channels.cache
            const channel = cache_channels?.find((channel) => channel.name === "music");
            if (member && VoiceChannel) {
                await client.distube.play(VoiceChannel, query, {
                    //@ts-ignore
                    textChannel: channel,
                    //@ts-ignore
                    member: member
                });
                await interaction.followUp({
                    content: `Añadida correctamente.`,
                    ephemeral: true
                });
                return;
            }
            return
        } catch (e) {
            await interaction.followUp({
                content: "No sabemos qué ha pasado. Pero vuelve intentarlo a ver si hay suerte",
                ephemeral: true
            })
            console.log(e)
        }
    }
}
export default PlayMusic;