import { EmbedBuilder } from "discord.js";

export const createStrongholdEmbed = (
	timestamp: number,
	strongholdNr?: string,
): EmbedBuilder => {
	const bearEmbed = new EmbedBuilder()
		.setColor(0x0099ff)
		.setTitle(
			`Battle for Stronghold ${strongholdNr ? `No. ${strongholdNr}` : ""}`,
		)
		.setDescription("Join us to take what's ours! @everyone")
		.setImage("https://i.imgur.com/zRRdurq.jpeg")
		.addFields({
			name: "Event Date",
			value: `<t:${timestamp}:F>`,
		})
		.setTimestamp();
	return bearEmbed;
};
