import { EmbedBuilder } from "discord.js";

export const createBearEmbed = (timestamp: number): EmbedBuilder => {
	const bearEmbed = new EmbedBuilder()
		.setColor(0x0099ff)
		.setTitle("Bear Hunt Event")
		.setDescription("Join us in bear bashing! @everyone")
		.setImage("https://i.imgur.com/tANamTP.jpeg")
		.addFields({
			name: "Event Date",
			value: `<t:${timestamp}:F>`,
		})
		.setTimestamp();
	return bearEmbed;
};
