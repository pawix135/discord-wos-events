import { Client, GatewayIntentBits } from "discord.js";
import { loadConfig } from "../config/utils";
import { logger } from "../logger";
import { getEventEmbed } from "./embeds";

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessages,
	],
});

export async function sendEventNotificiation(args: EventProps) {
	const config = await loadConfig();

	if (!config) {
		logger("ERROR", "Discord Client cannot run without a config file!");
		process.exit(1);
	}

	await spawn_discord_client(async (client) => {
		logger("INFO", `Logged in as ${client.user?.tag}!`);

		const channel = client.channels.cache.get(config.channelId);

		if (!channel) {
			logger("ERROR", "Channel not found!");
			process.exit(1);
		}

		if (!channel.isTextBased()) {
			logger("ERROR", "Channel is not text based!");
			process.exit(1);
		}

		const embed = getEventEmbed(args);

		await channel.send({ embeds: [embed] });
		await client.destroy();
	});
}

async function spawn_discord_client(
	callback: (client: Client<true>) => Promise<void>,
) {
	const config = await loadConfig();

	if (!config) {
		logger("ERROR", "Discord Client cannot run without a config file!");
		process.exit(1);
	}

	client.on("ready", async (client) => {
		callback(client);
	});

	client.login(config.botToken);
}
