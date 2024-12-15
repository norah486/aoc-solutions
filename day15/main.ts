import { readByLine } from '../lib/utils.ts';

const path = './day15/testdata.txt';

async function part1() {
	const rl = readByLine(path);

	const grid: string[][] = [];
	let directions: string = '';
	let i = 0;
	let j = 0;
	let pos_x = -1;
	let pos_y = -1;
	for await (const line of rl) {
		if (line) {
			if (i === 0) {
				const d = line.split('');
				if (d.indexOf('@') !== -1) {
					pos_x = d.indexOf('@');
					pos_y = j;
				}
				grid.push(d);
			} else {
				directions = directions.concat(line);
			}
			j += 1;
		} else {
			i += 1;
		}
	}

	function moveLeft(x: number, y: number) {
		if (
			(grid[y][x] === 'O' || grid[y][x] === '@') && grid[y][x - 1] === 'O'
		) {
			moveLeft(x - 1, y);
		}

		if (
			(grid[y][x] === 'O' || grid[y][x] === '@') && grid[y][x - 1] === '.'
		) {
			grid[y][x - 1] = grid[y][x];
			grid[y][x] = '.';

			if (grid[y][x - 1] === '@') pos_x -= 1;
		}
	}

	function moveRight(x: number, y: number) {
		if (
			(grid[y][x] === 'O' || grid[y][x] === '@') && grid[y][x + 1] === 'O'
		) {
			moveRight(x + 1, y);
		}

		if (
			(grid[y][x] === 'O' || grid[y][x] === '@') && grid[y][x + 1] === '.'
		) {
			grid[y][x + 1] = grid[y][x];
			grid[y][x] = '.';

			if (grid[y][x + 1] === '@') pos_x += 1;
		}
	}

	function moveUp(x: number, y: number) {
		if (
			(grid[y][x] === 'O' || grid[y][x] === '@') && grid[y - 1][x] === 'O'
		) {
			moveUp(x, y - 1);
		}

		if (
			(grid[y][x] === 'O' || grid[y][x] === '@') && grid[y - 1][x] === '.'
		) {
			grid[y - 1][x] = grid[y][x];
			grid[y][x] = '.';

			if (grid[y - 1][x] === '@') pos_y -= 1;
		}
	}

	function moveDown(x: number, y: number) {
		if (
			(grid[y][x] === 'O' || grid[y][x] === '@') && grid[y + 1][x] === 'O'
		) {
			moveDown(x, y + 1);
		}

		if (
			(grid[y][x] === 'O' || grid[y][x] === '@') && grid[y + 1][x] === '.'
		) {
			grid[y + 1][x] = grid[y][x];
			grid[y][x] = '.';

			if (grid[y + 1][x] === '@') pos_y += 1;
		}
	}

	for (const dir of directions) {
		if (dir === '<') {
			moveLeft(pos_x, pos_y);
		} else if (dir === '>') {
			moveRight(pos_x, pos_y);
		} else if (dir === '^') {
			moveUp(pos_x, pos_y);
		} else if (dir === 'v') {
			moveDown(pos_x, pos_y);
		}
	}

	let sum = 0;
	grid.forEach((l, y) => {
		console.log(l.toString().replaceAll(',', ''));
		l.forEach((c, x) => {
			if (c === 'O') sum += 100 * y + x;
		});
	});
	return sum;
}

const rl = readByLine(path);

const grid: string[][] = [];
let directions: string = '';
let i = 0;
let j = 0;
let pos_x = -1;
let pos_y = -1;
let printer = false;
for await (const line of rl) {
	if (line) {
		if (i === 0) {
			const d = line.split('');
			if (d.indexOf('@') !== -1) {
				pos_x = d.indexOf('@');
				pos_y = j;
			}
			grid.push(d);
		} else {
			directions = directions.concat(line);
		}
		j += 1;
	} else {
		i += 1;
	}
}

grid.forEach((l, y) => {
	l.forEach((c, x) => {
		if (c === '#') grid[y][x] = '##';
		if (c === 'O') grid[y][x] = '[]';
		if (c === '.') grid[y][x] = '..';
		if (c === '@') grid[y][x] = '@.';
	});
});

grid.forEach((l, y) => {
	const f = l.join().replaceAll(',', '');
	grid[y] = f.split('');
	if (f.indexOf('@') !== -1) pos_x = f.indexOf('@');
});

function moveLeft(x: number, y: number) {
	if (
		(grid[y][x] === '[' || grid[y][x] === ']' || grid[y][x] === '@') &&
		(grid[y][x - 1] === '[' || grid[y][x - 1] === ']')
	) {
		moveLeft(x - 1, y);
	}

	if (
		(grid[y][x] === '[' || grid[y][x] === ']' || grid[y][x] === '@') &&
		grid[y][x - 1] === '.'
	) {
		grid[y][x - 1] = grid[y][x];
		grid[y][x] = '.';

		if (grid[y][x - 1] === '@') pos_x -= 1;
	}
}

function moveRight(x: number, y: number) {
	if (
		(grid[y][x] === '[' || grid[y][x] === ']' || grid[y][x] === '@') &&
		(grid[y][x + 1] === '[' || grid[y][x + 1] === ']')
	) {
		moveRight(x + 1, y);
	}

	if (
		(grid[y][x] === '[' || grid[y][x] === ']' || grid[y][x] === '@') &&
		grid[y][x + 1] === '.'
	) {
		grid[y][x + 1] = grid[y][x];
		grid[y][x] = '.';

		if (grid[y][x + 1] === '@') pos_x += 1;
	}
}

function moveUp(x: number, y: number) {
	console.log(
		grid[y][x],
		x,
		y,
		grid[y - 1][x + 1],
		grid[y + 1][x],
		grid[y - 1][x + 1] === '[' && grid[y + 1][x] === '@',
		(grid[y][x] === '[' || grid[y][x] === ']' || grid[y][x] === '@') &&
			(grid[y - 1][x] === '[' || grid[y - 1][x + 1] === '[' ||
				grid[y - 1][x] === ']'),
		grid[y - 1][x - 1] === ']' && grid[y + 1][x] === '@',
	);

	if (
		(grid[y][x] === '[' || grid[y][x] === ']' || grid[y][x] === '@') &&
		(grid[y - 1][x] === '[' || grid[y - 1][x + 1] === '[' ||
			grid[y - 1][x] === ']' || grid[y - 1][x - 1] === ']')
	) {
		if (
			grid[y - 1][x + 1] === '[' && grid[y + 1][x] === '@' &&
			grid[y - 1][x] !== '.'
		) {
			moveUp(x + 1, y - 1);
		}
		if (
			grid[y - 1][x - 1] === ']' && grid[y + 1][x] === '@' &&
			grid[y - 1][x] !== '.'
		) {
			moveUp(x - 1, y - 1);
		}
		moveUp(x, y - 1);
	}

	if (
		(grid[y][x] === '[' && grid[y - 1][x] === '.' &&
			grid[y - 1][x + 1] === '.') ||
		(grid[y][x] === ']' && grid[y - 1][x] === '.' &&
			grid[y - 1][x - 1] === '.') ||
		(grid[y][x] === '@' && grid[y - 1][x] === '.')
	) {
		if (grid[y + 1][x] !== '@') {
			if (grid[y][x] !== '@') {
				if (grid[y][x + 1] === '[') {
					if (grid[y - 1][x + 1] !== '.') return;
					if (grid[y - 1][x + 2] !== '.') return;
				}

				if (grid[y][x - 1] === ']') {
					if (grid[y - 1][x - 1] !== '.') return;
					if (grid[y - 1][x - 2] !== '.') return;
				}
			}
		}

		if (grid[y][x] === '[') {
			grid[y - 1][x + 1] = grid[y][x + 1];
			grid[y - 1][x] = grid[y][x];

			grid[y][x + 1] = '.';
			grid[y][x] = '.';
		}

		if (grid[y][x] === ']') {
			grid[y - 1][x - 1] = grid[y][x - 1];
			grid[y - 1][x] = grid[y][x];

			grid[y][x - 1] = '.';
			grid[y][x] = '.';
		}

		if (grid[y][x] === '@') {
			grid[y - 1][x] = grid[y][x];
			grid[y][x] = '.';
		}

		if (grid[y - 1][x] === '@') pos_y -= 1;
	}
}

function moveDown(x: number, y: number) {
	if (
		(grid[y][x] === '[' || grid[y][x] === ']' || grid[y][x] === '@') &&
		(grid[y + 1][x] === '[' || grid[y + 1][x + 1] === '[' ||
			grid[y + 1][x] === ']' || grid[y + 1][x - 1] === ']')
	) {
		if (
			grid[y + 1][x + 1] === '[' && grid[y + 1][x] === '@' &&
			grid[y + 1][x] !== '.'
		) {
			moveDown(x + 1, y + 1);
		}
		if (
			grid[y + 1][x - 1] === ']' && grid[y + 1][x] === '@' &&
			grid[y + 1][x] !== '.'
		) {
			console.log('WHAT');
			moveDown(x - 1, y + 1);
		}
		moveDown(x, y + 1);
	}

	if (
		(grid[y][x] === '[' && grid[y + 1][x] === '.' &&
			grid[y + 1][x + 1] === '.') ||
		(grid[y][x] === ']' && grid[y + 1][x] === '.' &&
			grid[y + 1][x - 1] === '.') ||
		(grid[y][x] === '@' && grid[y + 1][x] === '.')
	) {
		if (grid[y + 1][x] !== '@') {
			if (grid[y][x] !== '@') {
				if (grid[y][x + 1] === '[') {
					if (grid[y + 1][x + 1] !== '.') return;
					if (grid[y + 1][x + 2] !== '.') return;
				}

				if (grid[y][x - 1] === ']') {
					if (grid[y + 1][x - 1] !== '.') return;
					if (grid[y + 1][x - 2] !== '.') return;
				}
			}
		}

		if (grid[y][x] === '[') {
			grid[y + 1][x + 1] = grid[y][x + 1];
			grid[y + 1][x] = grid[y][x];

			grid[y][x + 1] = '.';
			grid[y][x] = '.';
		}

		if (grid[y][x] === ']') {
			grid[y + 1][x - 1] = grid[y][x - 1];
			grid[y + 1][x] = grid[y][x];

			grid[y][x - 1] = '.';
			grid[y][x] = '.';
		}

		if (grid[y][x] === '@') {
			grid[y + 1][x] = grid[y][x];
			grid[y][x] = '.';
		}

		if (grid[y + 1][x] === '@') pos_y += 1;
	}
}

/*
grid[3][4] = '.';
grid[3][5] = '.';
grid[3][6] = '.';
grid[3][7] = '.';
grid[4][6] = '.';
grid[4][7] = '.';
grid[3][5] = '[';
grid[3][6] = ']';
grid[3][7] = '[';
grid[3][8] = ']';
grid[4][6] = '[';
grid[4][7] = ']';
grid[4][8] = '.';
grid[5][8] = '@';
pos_x = 8;
pos_y = 5;
*/
for (const dir of directions) {
	if (dir === '<') {
		moveLeft(pos_x, pos_y);
	} else if (dir === '>') {
		moveRight(pos_x, pos_y);
	} else if (dir === '^') {
		printer = true;
		moveUp(pos_x, pos_y);
	} else if (dir === 'v') {
		moveDown(pos_x, pos_y);
	}

	grid.forEach((l, y) => {
		console.log(l.toString().replaceAll(',', ''));
	});
}

grid.forEach((l, y) => {
	console.log(JSON.stringify(l));
});

let sum = 0;
grid.forEach((l, y) => {
	console.log(l.toString().replaceAll(',', ''));
	l.forEach((c, x) => {
		if (c === 'O') sum += 100 * y + x;
	});
});
console.log(sum);
