import {CommandInteraction, VoiceBasedChannel} from "discord.js";

export {default as Help} from "./Help"
export {default as PlayMusic} from "./PlayMusic"
export {default as PauseMusic} from "./PauseMedia"
export {default as ResumeMusic} from "./ResumeMusic"
export {default as SkipMusic} from "./SkipMusic"
export {default as QueueMusic} from "./QueueMusic"
export {default as VolumeMusic} from "./VolumeMusic"
export {default as LeaveMusic} from "./LeaveMusic"

export const helper_check_channel = async (interaction: CommandInteraction): Promise<VoiceBasedChannel | void> => {
    const {member, guild} = interaction;

    //@ts-ignore
    const VoiceChannel = member?.voice.channel;

    if (!VoiceChannel) {
        await interaction.followUp({
            content: "Please join to voice channel",
            ephemeral: true
        });
        return
    }

    if (guild?.members.me?.voice.channelId && VoiceChannel.id !== guild.members.me.voice.channelId) {
        await interaction.followUp({
            //@ts-ignore
            content: `Already playing music in ${guild.members.me.voice.channel}`,
            ephemeral: true
        });
        return;
    }
    return VoiceChannel;
}