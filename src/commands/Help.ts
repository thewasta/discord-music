import {CommandInterface} from "../CommandInterface";
import {
    ApplicationCommandType,
    Client, CommandInteraction
} from "discord.js";

const Help: CommandInterface = {
    name: "help",
    description: "Como usar el bot.",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        await interaction.followUp({
            content: `
            \`\`\`
Antes de usar los comandos debes estar en un canal de Voz.
Solamente admite:
 - Link de playlist y canciones de Youtube
 - Link de canción de spotify (no una playlist)
 - Texto de búsqueda
 - Link de SoundCloud
/play <link o texto búsqueda> Añadir a la cola de reproducción
/pause Si hay algo reproduciendo, será pausado
/resume Quita la pausa.
/leave Abandona el canal de voz, además la lista de reproducción es borrada.
/queue Lista de reproducción (máx 5)
/skip Salta a la siguiente
/volume <numero> Configura el volumen de 1 a 100.
\`\`\`
Disfruta y comparte!

Dev https://github.com/thewasta 
            `,
            ephemeral: true
        })
    }
}
export default Help;