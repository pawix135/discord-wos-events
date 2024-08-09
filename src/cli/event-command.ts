import commander from "commander";
import { sendEventNotificiation } from "../bot/client";
import { createTimestamp } from "../bot/utils";

const eventCommand = new commander.Command("event");

interface EventCommandOpts {
	T: string;
	H: string;
	M: string;
	S: string;
	stronghold?: string | undefined;
}

eventCommand
	.description("Make a Discord announcement for a WOS event")
	.requiredOption("--type, -t <type>", "The event to announce")
	.requiredOption("--hour, -h <hour>", "The hour of the event")
	.requiredOption("--minute, -m <minute>", "The minute of the event")
	.requiredOption("--second, -s <second>", "The second of the event")
	.option("--stronghold <stronghold_number>", "The Stronghold No.  to announce")
	.action(async (args: EventCommandOpts) => {
		const notificationArgs: EventProps = {
			type: args.T,
			timestamp: createTimestamp({ H: args.H, M: args.M, S: args.S }),
			args: {
				stronghold: args.stronghold ?? "",
			},
		};
		console.log(notificationArgs);
		await sendEventNotificiation(notificationArgs);
	});

export default eventCommand;
