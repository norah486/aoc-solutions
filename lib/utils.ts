import fs from 'node:fs';
import readline from 'node:readline';

export function readByLine(path: string) {
	const fileStream = fs.createReadStream(path);

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});

	return rl;
}

export function findMiddleElements(arr: string[]) {
	const result = [];
	const n = arr.length;

	if (n % 2 === 0) {
		result.push(arr[n / 2 - 1]);
		result.push(arr[n / 2]);
	} else {
		result.push(arr[Math.floor(n / 2)]);
	}

	return result;
}

// deno-lint-ignore no-explicit-any
export function popIndex(arr: any[], index: number) {
	arr.splice(index, 1);
}

export function replaceAt(str: string, replacement: string, index: number) {
	return str.substring(0, index) + replacement +
		str.substring(index + replacement.length);
}
