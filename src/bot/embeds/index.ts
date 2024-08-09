import type { EmbedBuilder } from "discord.js";
import { createBearEmbed } from "./bear-embed";
import { createStrongholdEmbed } from "./fortress-embed";

export function getEventEmbed(props: EventProps): EmbedBuilder {
	const { args, timestamp, type } = props;

	switch (type) {
		case "BEAR":
			return createBearEmbed(timestamp);
		case "STRONGHOLD":
			return createStrongholdEmbed(timestamp, args.stronghold);
		default:
			throw new Error("Invalid event type");
	}
}
