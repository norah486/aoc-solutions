import { readByLine } from '../lib/utils.ts';

const path = './day14/data.txt';

async function part1() {
	const rl = readByLine(path);

	class Robot {
		id: number;
		x: number;
		y: number;
		v_x: number;
		v_y: number;

		constructor(
			id: number,
			x: number,
			y: number,
			v_x: number,
			v_y: number,
		) {
			this.id = id;
			this.x = x;
			this.y = y;
			this.v_x = v_x;
			this.v_y = v_y;
		}

		update() {
			if (this.x + this.v_x >= 101) this.x += this.v_x - 101;
			else if (this.x + this.v_x < 0) this.x += this.v_x + 101;
			else this.x += this.v_x;

			if (this.y + this.v_y >= 103) this.y += this.v_y - 103;
			else if (this.y + this.v_y < 0) this.y += this.v_y + 103;
			else this.y += this.v_y;
		}
	}

	const robots: Robot[] = [];
	let i = 0;
	for await (const line of rl) {
		if (line) {
			const l = line.split(' ');
			const p = l.at(0)?.split('=').at(1)?.split(',');
			const p_x = Number(p?.at(0));
			const p_y = Number(p?.at(1));

			const v = l.at(1)?.split('=').at(1)?.split(',');
			const v_x = Number(v?.at(0));
			const v_y = Number(v?.at(1));
			robots.push(new Robot(i, p_x, p_y, v_x, v_y));
			i += 1;
		}
	}

	for (let i = 0; i < 100; i++) {
		robots.forEach((robo) => {
			robo.update();
		});
	}

	let q1 = 0;
	let q2 = 0;
	let q3 = 0;
	let q4 = 0;

	robots.forEach((robo) => {
		if (robo.x < 50 && robo.y < 51) q1 += 1;
		if (robo.x > 50 && robo.y < 51) q2 += 1;
		if (robo.x < 50 && robo.y > 51) q3 += 1;
		if (robo.x > 50 && robo.y > 51) q4 += 1;
	});

	const sum = q1 * q2 * q3 * q4;
	return sum;
}

async function part2() {
	const rl = readByLine(path);

	class Robot {
		id: number;
		x: number;
		y: number;
		v_x: number;
		v_y: number;

		constructor(
			id: number,
			x: number,
			y: number,
			v_x: number,
			v_y: number,
		) {
			this.id = id;
			this.x = x;
			this.y = y;
			this.v_x = v_x;
			this.v_y = v_y;
		}

		update() {
			if (this.x + this.v_x >= 101) this.x += this.v_x - 101;
			else if (this.x + this.v_x < 0) this.x += this.v_x + 101;
			else this.x += this.v_x;

			if (this.y + this.v_y >= 103) this.y += this.v_y - 103;
			else if (this.y + this.v_y < 0) this.y += this.v_y + 103;
			else this.y += this.v_y;
		}
	}

	const robots: Robot[] = [];
	let i = 0;
	for await (const line of rl) {
		if (line) {
			const l = line.split(' ');
			const p = l.at(0)?.split('=').at(1)?.split(',');
			const p_x = Number(p?.at(0));
			const p_y = Number(p?.at(1));

			const v = l.at(1)?.split('=').at(1)?.split(',');
			const v_x = Number(v?.at(0));
			const v_y = Number(v?.at(1));
			robots.push(new Robot(i, p_x, p_y, v_x, v_y));
			i += 1;
		}
	}

	for (let i = 0; i < 9000; i++) {
		const grid: string[][] = [];
		for (let i = 0; i < 103; i++) {
			const f = [];
			for (let j = 0; j < 101; j++) {
				f.push('.');
			}
			grid.push(f);
		}

		robots.forEach((robo) => {
			robo.update();
			grid[robo.y][robo.x] = 'X';
		});

		const fd = /XXXXXXXXXXXX/gm;
		let found = false;
		grid.forEach((l) => {
			if (l.toString().replaceAll(',', '').match(fd)) {
				found = true;
			}
		});

		if (found) return i + 1;
	}
	return 0;
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
