import {CommandInterface} from "./CommandInterface";
import {QueueMusic, LeaveMusic, VolumeMusic} from './commands'
import {PlayMusic, Help, PauseMusic, ResumeMusic, SkipMusic} from "./commands";

export const CommandHandler: (CommandInterface)[] = [
    Help, PlayMusic, PauseMusic, ResumeMusic,
    QueueMusic, LeaveMusic, SkipMusic, VolumeMusic
]