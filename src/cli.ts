import commander from "commander";
import eventCommand from "./cli/event-command";
import configCommand from "./cli/config-command";
import announcementCommand from "./cli/announcment-command";

export const program = new commander.Command();
program.addCommand(eventCommand);
program.addCommand(configCommand);
program.addCommand(announcementCommand);
