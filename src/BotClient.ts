import {ActivityType, Client, IntentsBitField} from "discord.js";
import DisTube from "distube";
import SpotifyPlugin from "@distube/spotify";
import SoundCloudPlugin from "@distube/soundcloud";
import {YtDlpPlugin} from "@distube/yt-dlp";

export class BotClient extends Client {
    public distube: DisTube;
    constructor() {
        super({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.GuildVoiceStates
            ]
        });
        this.distube = new DisTube(this, {
            leaveOnFinish: true,
            leaveOnEmpty: true,
            leaveOnStop: false,
            emitNewSongOnly: true,
            emitAddSongWhenCreatingQueue: false,
            emitAddListWhenCreatingQueue: false,
            plugins: [
                new SpotifyPlugin({
                    emitEventsAfterFetching: true
                }),
                new SoundCloudPlugin(),
                new YtDlpPlugin()
            ]
        });
        const self = this;
        this.distube.on("playSong", async (queue, song) => {

            //@todo
            //const channels = self.guilds.client.channels.cache
            // console.log(channels)
            if (queue.textChannel) {
                queue.textChannel.send(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${
                    song.user
                }\n`)
            }
        })

        this.distube.on('error', (channel, e) => {
            if (channel) channel.send(`An error encountered: ${e}`)
            else console.error(e)
        })
    }
}