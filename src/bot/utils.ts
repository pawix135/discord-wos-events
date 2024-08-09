import dfn from "date-fns";

export function createTimestamp(time: {
	H: string;
	M: string;
	S: string;
}): number {
	let localDate = new Date();

	localDate = dfn.setHours(localDate, Number.parseInt(time.H));
	localDate = dfn.setMinutes(localDate, Number.parseInt(time.M));
	localDate = dfn.setSeconds(localDate, Number.parseInt(time.S));
	localDate = dfn.setMilliseconds(localDate, 0);

	const timestamp = dfn.getTime(localDate) / 1000;

	return timestamp;
}
