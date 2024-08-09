interface EventProps {
	type: string;
	timestamp: number;
	args: {
		[key: string]: string;
		stronghold?: string | undefined;
	};
}
