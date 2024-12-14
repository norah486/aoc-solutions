import { readByLine } from '../lib/utils.ts';
import { createCanvas } from 'https://deno.land/x/canvas@v1.4.2/mod.ts';

const canvas = createCanvas(100, 102);
const ctx = canvas.getContext('2d');

const path = './day14/data.txt';

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

for (let p = 0; p < 9000; p++) {
	const grid: string[][] = [];
	for (let i = 0; i < 103; i++) {
		const f = [];
		for (let j = 0; j < 101; j++) {
			f.push(' ');
		}
		grid.push(f);
	}

	robots.forEach((robo) => {
		robo.update();
		grid[robo.y][robo.x] = '#';
	});

	const fd = /\#\#\#\#\#\#\#/gm;
	let found = false;

	grid.forEach((l) => {
		if (l.toString().replaceAll(',', '').match(fd)) {
			found = true;
		}
	});

	if (found) {
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, 200, 200);
		ctx.fillStyle = 'white';

		grid.forEach((line, y) => {
			line.forEach((c, x) => {
				if (c === '#') ctx.fillRect(x, y, 1, 1);
			});
		});
		await Deno.writeFile(`day14/images/frame${p}.png`, canvas.toBuffer());
	}
}
