import { CONFIG_FILENAME } from "../constants";
import fs from "node:fs/promises";
import { logger } from "../logger";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export async function setConfigKey(
	key: keyof ConfigFile,
	value: string,
): Promise<boolean> {
	try {
		const config = await loadConfig();
		if (config === null) {
			return false;
		}
		config[key] = value;
		await createConfigFile(config);
		return true;
	} catch (error) {
		logger("ERROR", "Failed to set config key ❌!", error);
		return false;
	}
}

export async function getConfigValue(key: keyof ConfigFile): Promise<string> {
	const config = await loadConfig();

	if (config === null) {
		throw new Error("Config file not found!");
	}

	return config[key];
}

export async function loadConfig(): Promise<ConfigFile | null> {
	try {
		const rawConfig = await fs.readFile(CONFIG_FILENAME, "utf-8");
		try {
			return JSON.parse(rawConfig) as ConfigFile;
		} catch (error) {
			logger("ERROR", "Failed to parse config file ❌!", error);
			return null;
		}
	} catch (error) {
		logger("ERROR", "Failed to load config file ❌!", error);
		return null;
	}
}

export async function generateConfig(): Promise<void> {
	const configFileExists = await fs.stat(CONFIG_FILENAME).catch(() => false);

	if (!configFileExists) {
		await createConfigFile();
	} else {
		// @ts-ignore
		const rl = createInterface({ input, output });
		logger("WARN", "Config file already exists!");
		const answer = await rl.question("Do you want to overwrite it? (y/n) ");

		if (answer !== "y") {
			logger("INFO", "Exiting...");
		} else {
			await createConfigFile();
		}

		rl.close();
	}
}

async function createConfigFile(content?: ConfigFile): Promise<void> {
	try {
		await fs.writeFile(
			CONFIG_FILENAME,
			JSON.stringify(
				content ??
					({
						channelId: "",
						botToken: "",
					} as ConfigFile),
			),
		);
		logger(
			"INFO",
			content ? "Config file updated ✅!" : "Config file created ✅!",
		);
	} catch (_) {
		logger("ERROR", "Something went wrong while creating the config file ❌!");
	}
}
