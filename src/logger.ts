const LOG_LEVEL = {
	INFO: "INFO",
	WARN: "WARN",
	ERROR: "ERROR",
} as const;

export function logger(
	level: keyof typeof LOG_LEVEL,
	message: string,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	...args: any[]
) {
	console.log(`[${level}] ${message} ${args.join(" ")}`);
}
