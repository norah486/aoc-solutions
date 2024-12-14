import { readByLine } from '../lib/utils.ts';

const path = './day06/data.txt';

const rl = readByLine(path);

const grid: string[][] = [];
for await (const line of rl) {
	const d = line.split('');
	grid.push(d);
}

let dir: '^' | 'v' | '<' | '>' = '^';
let [pos_x, pos_y]: [number, number] = [0, 0];
let total_steps = 0;
let roadblocks = 0;

grid.forEach((line, i) => {
	const v = line.includes('^');
	if (v) {
		pos_x = line.findIndex((d) => d === '^');
		pos_y = i;
	}
});

const intervalo = setInterval(() => {
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
			if (pos_y - 1 === -1) {
				clearInterval(intervalo);
				break;
			}
			if (grid[pos_y - 1][pos_x] === '#') {
				dir = '>';
				roadblocks += 1;
			} else {
				grid[pos_y][pos_x] = 'X';
				grid[pos_y - 1][pos_x] = '^';
				pos_y -= 1;
				total_steps += 1;
			}
		} else if (dir === '>') {
			if (pos_x + 2 > grid[pos_y].length) {
				clearInterval(intervalo);
				break;
			}
			if (grid[pos_y][pos_x + 1] === '#') {
				dir = 'v';
				roadblocks += 1;
			} else {
				grid[pos_y][pos_x] = 'X';
				grid[pos_y][pos_x + 1] = '>';
				pos_x += 1;
				total_steps += 1;
			}
		} else if (dir === 'v') {
			if (pos_y + 2 > grid.length) {
				clearInterval(intervalo);
				break;
			}
			if (grid[pos_y + 1][pos_x] === '#') {
				dir = '<';
				roadblocks += 1;
			} else {
				grid[pos_y][pos_x] = 'X';
				grid[pos_y + 1][pos_x] = 'v';
				pos_y += 1;
				total_steps += 1;
			}
		} else if (dir === '<') {
			if (pos_x - 1 === -1) {
				clearInterval(intervalo);
				break;
			}
			if (grid[pos_y][pos_x - 1] === '#') {
				dir = '^';
				roadblocks += 1;
			} else {
				grid[pos_y][pos_x] = 'X';
				grid[pos_y][pos_x - 1] = '<';
				pos_x -= 1;
				total_steps += 1;
			}
		}

		console.clear();

		let foundY: number = -1;
		let sum = 0;
		grid.forEach((line, i) => {
			const ff = line.findIndex((dd) =>
				dd === '^' || dd === 'v' || dd === '<' || dd === '>'
			);
			if (ff !== -1) {
				foundY = i;
			}
			line.forEach((char) => {
				if (char === 'X') sum += 1;
			});
		});

		console.log('\u001B[?25l');
		const foundYY = foundY - 24 > -1 ? foundY - 24 : 0;

		const foundYYy = foundYY === 0 ? 48 : foundYY + 48;
		const asd = foundYYy > grid.length ? grid.length : foundYYy;
		console.log(
			`Day 06 Part 01 - Total Steps: ${total_steps} \tBoxes Hit: ${roadblocks} \tUnique sites visited: ${sum}`,
		);
		const test_grid = grid.slice(foundYY, asd);
		test_grid.forEach((l) => {
			const line = l;

			const x_split = line.findIndex((dd) =>
				dd === '^' || dd === 'v' || dd === '<' || dd === '>'
			);
			console.log(
				line.toString().replaceAll(',', '').slice(0, x_split)
					.replaceAll('X', '\u001B[?25l\u001b[1;31mX\u001b[0;0m') +
					(x_split > -1 ? '\x1b[36m' + dir + '\u001b[0;0m' : '') +
					(x_split > -1
						? line.toString().replaceAll(',', '').slice(
							x_split + 1,
							-1,
						).replaceAll('X', '\u001B[?25l\u001b[1;31mX\u001b[0;0m')
						: ''),
			);
		});
		break;
	}
}, 30);
