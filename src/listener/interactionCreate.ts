import {BaseInteraction, CommandInteraction, ContextMenuCommandInteraction} from "discord.js";
import {CommandHandler} from "../CommandHandler";
import {BotClient} from "../BotClient";

export default (client: BotClient): void => {
    client.on("interactionCreate", async (interaction: BaseInteraction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand())
            await handleSlashCommand(client, interaction);
    });
}

const handleSlashCommand = async (client: BotClient, interaction: CommandInteraction | ContextMenuCommandInteraction): Promise<void> => {
    const command = CommandHandler.find(c => c.name === interaction.commandName);

    if (!command) {
        await interaction.followUp({content: "An error has occurred"});
        return;
    }
    await interaction.deferReply();
    command.run(client, interaction);
}