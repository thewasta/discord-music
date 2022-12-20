import {CommandInterface} from "../CommandInterface";
import {ApplicationCommandType, CommandInteraction} from "discord.js";
import {BotClient} from "../BotClient";
import {helper_check_channel} from "./index";

const ResumeMusic: CommandInterface = {
    name: "resume",
    description: "Empty description",
    type: ApplicationCommandType.ChatInput,
    run: async (client: BotClient, interaction: CommandInteraction) => {
        const v = await helper_check_channel(interaction)
        let queue;
        if (!v) {
            return;
        }
        if (v) {
            queue = client.distube.getQueue(v)
        }
        if (!queue) {
            await interaction.followUp({
                content: "No hay nada reproduciendo.",
                ephemeral: true
            });
            return;
        }
        if (queue) {
            if (!queue.paused) {
                await interaction.followUp({
                    content: "Canción no está pausada.",
                    ephemeral: true
                })
                return
            }
            try {
                client.distube.resume(v);
                await interaction.followUp({
                    content: "Volviendo a reproducir canción.",
                    ephemeral: true
                })
                return
            } catch (e) {
                console.log("error")
                await interaction.followUp({
                    content: "No sabemos qué ha pasado. Pero vuelve intentarlo a ver si hay suerte",
                    ephemeral: true
                })
                console.log(e)
            }
        }
    }
}


export default ResumeMusic;