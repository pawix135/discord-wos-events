import commander from "commander";
import { generateConfig, loadConfig, setConfigKey } from "../config/utils";
import { logger } from "../logger";

const configCommand = new commander.Command("config");

configCommand.description("Configure WOS Events");

configCommand
	.command("channel")
	.argument("<channel_id>", "The Discord channel ID to send announcements to.")
	.action(async (channelId) => {
		if (typeof channelId !== "string") {
			logger("WARN", "Channel ID must be a string.");
			return;
		}
		setConfigKey("channelId", channelId);
	});

configCommand
	.command("token")
	.argument("<bot_token>", "The Discord Bot token.")
	.action(async (botToken) => {
		setConfigKey("botToken", botToken);
	});

configCommand.command("init").action(async () => {
	await generateConfig();
});

export default configCommand;
