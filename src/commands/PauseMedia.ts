import {ApplicationCommandType, CommandInteraction} from "discord.js";
import {CommandInterface} from "../CommandInterface";
import {BotClient} from "../BotClient";
import {helper_check_channel} from "./index";

const PauseMedia: CommandInterface = {
    name: "pause",
    description: "Pausar la canción actual",
    type: ApplicationCommandType.ChatInput,
    run: async (client: BotClient, interaction: CommandInteraction) => {
        const VoiceChannel = await helper_check_channel(interaction);
        if (!VoiceChannel) return;
        const queue = client.distube.getQueue(VoiceChannel)

        try{
            if (!queue) {
                await interaction.followUp({
                    content: "No hay nada reproduciendo.",
                    ephemeral: true
                });
                return;
            }
            if (queue.paused) {
                await interaction.followUp({
                    content: "Canción ya está pausada.",
                    ephemeral: true
                })
                return
            }
        }catch (e){
            await interaction.followUp({
                content: 'Error',
                ephemeral: true
            })
            console.log(e)
        }

        try {
            client.distube.pause(VoiceChannel);
            await interaction.followUp({
                content: "Canción pausada.",
                ephemeral: true

            })
            return
        } catch (e) {
            await interaction.followUp({
                content: "Ha surgido un error inesperado al pausar.",
                ephemeral: true
            })
            console.log(e)
        }
    }

}

export default PauseMedia;