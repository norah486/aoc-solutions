import { readByLine } from '../lib/utils.ts';

const path = './day12/data.txt';

async function part1() {
	const rl = readByLine(path);

	const grid: string[][] = [];
	for await (const line of rl) {
		if (line) {
			grid.push(line.split(''));
		}
	}

	const area_positions: number[][] = [[0, 0]];
	const overall_visited: number[][] = [];

	let sum: number = 0;

	for (const a of area_positions) {
		const [xx, yy] = a;

		const positions: number[][] = [[xx, yy]];
		const visited: number[][] = [];

		let area: number = 0;
		let bounds: number = 0;

		if (
			(
				overall_visited.filter((pp) => pp[0] === xx && pp[1] === yy)
					.length ===
					0
			) && (xx >= 0 && yy >= 0) &&
			(xx < grid[yy]?.length && yy < grid.length)
		) {
			for (const p of positions) {
				const [x, y] = [p[0], p[1]];
				const val = grid[y]?.[x];

				if (
					(visited.filter((pp) => pp[0] == x && pp[1] == y).length ===
						0) && (x >= 0 && y >= 0)
				) {
					area += 1;
					visited.push([x, y]);
					overall_visited.push([x, y]);

					const up = grid[y - 1]?.[x];
					const right = grid[y]?.[x + 1];
					const left = grid[y]?.[x - 1];
					const down = grid[y + 1]?.[x];

					if (up === val) positions.push([x, y - 1]);
					else {
						area_positions.push([x, y - 1]);
						bounds += 1;
					}

					if (right === val) positions.push([x + 1, y]);
					else {
						area_positions.push([x + 1, y]);
						bounds += 1;
					}

					if (left === val) positions.push([x - 1, y]);
					else {
						area_positions.push([x - 1, y]);
						bounds += 1;
					}

					if (down === val) positions.push([x, y + 1]);
					else {
						area_positions.push([x, y + 1]);
						bounds += 1;
					}
				}
			}
			sum += area * bounds;
		}
	}

	return sum;
}

async function part2() {
	const rl = readByLine(path);

	const grid: string[][] = [];
	for await (const line of rl) {
		if (line) {
			grid.push(line.split(''));
		}
	}

	const area_positions: number[][] = [[0, 0]];
	const overall_visited: number[][] = [];

	let sum: number = 0;

	for (const a of area_positions) {
		const [xx, yy] = a;

		const positions: number[][] = [[xx, yy]];
		const visited: number[][] = [];

		let area: number = 0;
		let bounds: number = 0;

		let borders: number = 0;

		if (
			(
				overall_visited.filter((pp) => pp[0] === xx && pp[1] === yy)
					.length ===
					0
			) && (xx >= 0 && yy >= 0) &&
			(xx < grid[yy]?.length && yy < grid.length)
		) {
			for (const p of positions) {
				const [x, y] = [p[0], p[1]];
				const val = grid[y]?.[x];

				if (
					(visited.filter((pp) => pp[0] == x && pp[1] == y).length ===
						0) && (x >= 0 && y >= 0)
				) {
					area += 1;
					visited.push([x, y]);
					overall_visited.push([x, y]);

					const up = grid[y - 1]?.[x];
					const right = grid[y]?.[x + 1];
					const left = grid[y]?.[x - 1];
					const down = grid[y + 1]?.[x];

					const ul = grid[y - 1]?.[x - 1];
					const dl = grid[y + 1]?.[x - 1];
					const ur = grid[y - 1]?.[x + 1];
					const dr = grid[y + 1]?.[x + 1];

					if (up === val) positions.push([x, y - 1]);
					else {
						area_positions.push([x, y - 1]);
						bounds += 1;
					}

					if (right === val) positions.push([x + 1, y]);
					else {
						area_positions.push([x + 1, y]);
						bounds += 1;
					}

					if (left === val) positions.push([x - 1, y]);
					else {
						area_positions.push([x - 1, y]);
						bounds += 1;
					}

					if (down === val) positions.push([x, y + 1]);
					else {
						area_positions.push([x, y + 1]);
						bounds += 1;
					}

					if (down !== val && left !== val) borders += 1;
					if (down !== val && right !== val) borders += 1;
					if (up !== val && left !== val) borders += 1;
					if (up !== val && right !== val) borders += 1;

					if (up !== val && left === val && ul === val) borders += 1;
					if (up !== val && right === val && ur === val) borders += 1;

					if (down !== val && right === val && dr === val) {
						borders += 1;
					}
					if (down !== val && left === val && dl === val) {
						borders += 1;
					}
				}
			}
			sum += area * borders;
		}
	}

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
