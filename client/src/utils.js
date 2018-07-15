const PERCENT_COLOR_TO_BYTE = 255 / 100;

export function percentColorChannelToByte (value) {
	return Math.round(value * PERCENT_COLOR_TO_BYTE);
}

export function percentColorChannelToHexa (value) {
	return ('0'+(Number(percentColorChannelToByte(value)).toString(16)))
		.slice(-2)
		.toUpperCase();
}

export function percentColorToHexa ({ r, g, b }) {
	return (
		percentColorChannelToHexa(r) +
		percentColorChannelToHexa(g) +
		percentColorChannelToHexa(b)
	);
}
