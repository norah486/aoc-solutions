import { readByLine } from '../lib/utils.ts';

const path = './day04/data.txt';

async function part1() {
	const rl = readByLine(path);

	const grid: string[][] = [];

	for await (const line of rl) {
		const d = line.split('');
		grid.push(d);
	}

	let sum = 0;
	grid.forEach((arr, y) => {
		arr.forEach((_val, x) => {
			const horizontal = `${grid[y][x]}${grid[y][x + 1]}${
				grid[y][x + 2]
			}${grid[y][x + 3]}`;
			const vertical = `${grid[y][x]}${grid[y + 1]?.[x] ?? '-'}${
				grid[y + 2]?.[x] ?? '-'
			}${grid[y + 3]?.[x] ?? '-'}`;
			const diagDown = `${grid[y][x]}${grid[y + 1]?.[x + 1] ?? '-'}${
				grid[y + 2]?.[x + 2] ?? '-'
			}${grid[y + 3]?.[x + 3] ?? '-'}`;
			const diagUp = `${grid[y][x]}${grid[y - 1]?.[x + 1] ?? '-'}${
				grid[y - 2]?.[x + 2] ?? '-'
			}${grid[y - 3]?.[x + 3] ?? '-'}`;
			if (['XMAS', 'SAMX'].some((word) => horizontal.includes(word))) {
				sum += 1;
			}
			if (['XMAS', 'SAMX'].some((word) => vertical.includes(word))) {
				sum += 1;
			}
			if (['XMAS', 'SAMX'].some((word) => diagDown.includes(word))) {
				sum += 1;
			}
			if (['XMAS', 'SAMX'].some((word) => diagUp.includes(word))) {
				sum += 1;
			}
		});
	});

	return sum;
}

async function part2() {
	const rl = readByLine(path);

	const grid: string[][] = [];

	for await (const line of rl) {
		const d = line.split('');
		grid.push(d);
	}

	let sum = 0;
	grid.forEach((arr, y) => {
		arr.forEach((val, x) => {
			if (val === 'A') {
				const ltrd = `${grid[y - 1]?.[x - 1] ?? ''}${grid[y][x]}${
					grid[y + 1]?.[x + 1] ?? ''
				}`;
				const rtld = `${grid[y + 1]?.[x - 1] ?? ''}${grid[y][x]}${
					grid[y - 1]?.[x + 1] ?? ''
				}`;

				if (
					['M', 'A', 'S'].every((letters) =>
						ltrd.includes(letters)
					) &&
					['M', 'A', 'S'].every((letters) => rtld.includes(letters))
				) {
					sum += 1;
				}
			}
		});
	});

	return sum;
}

Deno.bench({
	name: 'Part 1',
	fn: async () => {
		await part1();
	},
});

Deno.bench({
	name: 'Part 2',
	fn: async () => {
		await part2();
	},
});

Deno.bench({
	name: 'Both',
	fn: async () => {
		await part1();
		await part2();
	},
});
