import { readByLine } from '../lib/utils.ts';
import { check_loop } from './extra.ts';

const path = './day06/testdata.txt';

async function part1() {
	const rl = readByLine(path);

	const grid: string[][] = [];
	for await (const line of rl) {
		const d = line.split('');
		grid.push(d);
	}

	let dir: '^' | 'v' | '<' | '>' = '^';
	let [pos_x, pos_y]: [number, number] = [0, 0];

	grid.forEach((line, i) => {
		const v = line.includes('^');
		if (v) {
			pos_x = line.findIndex((d) => d === '^');
			pos_y = i;
		}
	});

	while (
		grid.some(
			(line) =>
				line.includes('^') ||
				line.includes('>') ||
				line.includes('v') ||
				line.includes('<'),
		) &&
		pos_y > 0
	) {
		if (dir === '^') {
			if (grid[pos_y - 1][pos_x] === '#') {
				dir = '>';
			} else {
				grid[pos_y][pos_x] = 'X';
				grid[pos_y - 1][pos_x] = '^';
				pos_y -= 1;
			}
		}
		if (dir === '>') {
			if (pos_x + 2 > grid[pos_y].length) break;
			if (grid[pos_y][pos_x + 1] === '#') {
				dir = 'v';
			} else {
				grid[pos_y][pos_x] = 'X';
				grid[pos_y][pos_x + 1] = '>';
				pos_x += 1;
			}
		}
		if (dir === 'v') {
			if (pos_y + 2 > grid.length) break;
			if (grid[pos_y + 1][pos_x] === '#') {
				dir = '<';
			} else {
				grid[pos_y][pos_x] = 'X';
				grid[pos_y + 1][pos_x] = 'v';
				pos_y += 1;
			}
		}
		if (dir === '<') {
			if (pos_x - 1 === -1) break;
			if (grid[pos_y][pos_x - 1] === '#') {
				dir = '^';
			} else {
				grid[pos_y][pos_x] = 'X';
				grid[pos_y][pos_x - 1] = '<';
				pos_x -= 1;
			}
		}
	}

	let sum = 0;
	grid.forEach((line) => {
		line.forEach((char) => {
			if (char === 'X') sum += 1;
		});
	});
	sum += 1;
	return sum;
}

async function part2() {
	const rl = readByLine(path);

	let grid: string[][] = [];
	// let grid: string[] = [];
	for await (const line of rl) {
		const d = line.split('');
		// const f = d.toString().replaceAll(",", "");
		// grid.push(f);
		grid.push(d);
	}
	// const base_grid = [...grid];
	const base_grid = JSON.parse(JSON.stringify(grid));
	const col_positions = new Map();

	let dir: '^' | 'v' | '<' | '>' = '^';
	let [pos_x, pos_y]: [number, number] = [0, 0];

	grid.forEach((line, i) => {
		const v = line.includes('^');
		if (v) {
			//pos_x = line.indexOf("^");
			pos_x = line.findIndex((d) => d === '^');
			pos_y = i;
		}
	});

	const [base_x, base_y]: [number, number] = [pos_x, pos_y];
	// console.log(pos_x, pos_y);

	while (
		grid.some(
			(line) =>
				line.includes('^') ||
				line.includes('>') ||
				line.includes('v') ||
				line.includes('<'),
		) &&
		pos_y > 0
	) {
		if (col_positions.has(`${pos_x},${pos_y}`)) {
			col_positions.get(`${pos_x},${pos_y}`).push(dir);
		} else {
			col_positions.set(`${pos_x},${pos_y}`, [dir]);
		}

		if (dir === '^') {
			if (grid[pos_y - 1][pos_x] === '#') {
				dir = '>';
			} else {
				grid[pos_y][pos_x] = 'X';
				grid[pos_y - 1][pos_x] = '^';
				// grid[pos_y] = replaceAt(grid[pos_y], "X", pos_x);
				// grid[pos_y - 1] = replaceAt(grid[pos_y - 1], "^", pos_x);
				pos_y -= 1;
			}
		}
		if (dir === '>') {
			if (pos_x + 2 > grid[pos_y].length) break;
			if (grid[pos_y][pos_x + 1] === '#') {
				dir = 'v';
			} else {
				grid[pos_y][pos_x] = 'X';
				grid[pos_y][pos_x + 1] = '>';
				// grid[pos_y] = replaceAt(grid[pos_y], "X", pos_x);
				// grid[pos_y] = replaceAt(grid[pos_y], ">", pos_x + 1);
				pos_x += 1;
			}
		}
		if (dir === 'v') {
			if (pos_y + 2 > grid.length) break;
			if (grid[pos_y + 1][pos_x] === '#') {
				dir = '<';
			} else {
				grid[pos_y][pos_x] = 'X';
				grid[pos_y + 1][pos_x] = 'v';

				// grid[pos_y] = replaceAt(grid[pos_y], "X", pos_x);
				// grid[pos_y + 1] = replaceAt(grid[pos_y + 1], "v", pos_x);
				pos_y += 1;
			}
		}
		if (dir === '<') {
			if (pos_x - 1 === -1) break;
			if (grid[pos_y][pos_x - 1] === '#') {
				dir = '^';
			} else {
				grid[pos_y][pos_x] = 'X';
				grid[pos_y][pos_x - 1] = '<';
				// grid[pos_y] = replaceAt(grid[pos_y], "X", pos_x);
				// grid[pos_y] = replaceAt(grid[pos_y], ">", pos_x - 1);
				pos_x -= 1;
			}
		}
	}

	let sum = 0;
	let i = 0;

	for (const val of col_positions) {
		if (i != 0) {
			const [sc_x, sc_y]: [string, string] = val[0].split(',');
			const [c_x, c_y] = [Number(sc_x), Number(sc_y)];
			grid = JSON.parse(JSON.stringify(base_grid));
			// Option 1 - Slow
			// grid = [...base_grid];
			// Option 2 - Wrong
			// grid.forEach((_row, i) => _row = base_grid[i].slice());
			// Option 3 - Wrong
			// grid = base_grid.slice();
			// Option 4 - Slow
			// grid = Array.from(base_grid);
			//grid.forEach((_r, i) => {
			//    grid[i] = [...base_grid[i]];
			// });
			//grid = base_grid.map((row: any) => [...row]);
			// grid = Array.from(base_grid, (row) => [...row]);
			// for (let i = 0; i < base_grid.length; i++) {
			//     grid[i] = [...base_grid[i]]; // Create a shallow copy of each row (deep for arrays of arrays)
			// }
			// grid = [].concat(base_grid);

			[pos_x, pos_y] = [base_x, base_y];
			grid[c_y][c_x] = '#';
			// grid[c_y] = replaceAt(grid[c_y], "#", c_x);
			// console.log(grid[c_y]);
			// console.log();
			//
			// console.log(
			//     `Checking loop with box at X: ${c_x} Y: ${c_y} -- ${i} out of ${col_positions.size}`,
			// );
			// grid.forEach((l) => {
			//     console.log(l);
			// });
			// console.log();
			const f = check_loop(grid, pos_x, pos_y);
			if (f) {
				sum += 1;
			}
		}
		i += 1;
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
