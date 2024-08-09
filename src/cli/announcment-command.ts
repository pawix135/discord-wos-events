import commander from "commander";

const announcementCommand = new commander.Command("announcement");

announcementCommand
	.description("Make a Discord announcement for a WOS event")
	.argument("<mesasge...>", "The event to announce")
	.action((args) => {
		console.log(args);
	});

announcementCommand.command("announcement");

export default announcementCommand;
