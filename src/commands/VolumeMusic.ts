import {CommandInterface} from "../CommandInterface";
import {ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction} from "discord.js";
import {BotClient} from "../BotClient";
import {helper_check_channel} from "./index";

const VolumeMusic: CommandInterface = {
    name: "volume",
    description: "Cambiar volumen de la musica de 1 a 100",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "volume",
            description: "Escribe un número de 1 a 100",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (client: BotClient, interaction: CommandInteraction) => {
        const vc = await helper_check_channel(interaction)
        if (!vc) return;
        const queue = client.distube.getQueue(vc);
        if (!queue) return await interaction.followUp({content: "¿Ere tonto? No estas escuchando na."});
        const volume = interaction.options.get("volume")?.value as string;
        if (isNaN(parseInt(volume))) return await interaction.followUp({content: "Escribe un número válido"})
        queue.setVolume(parseInt(volume))
        await interaction.followUp({
            content: `Volumen configurado a: \`${volume}\``
        })
    }
}
export default VolumeMusic