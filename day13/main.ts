import { readByLine } from '../lib/utils.ts';

const path = './day13/data.txt';

async function part1() {
	const rl = readByLine(path);

	class Machine {
		readonly id: number;
		ax_offset: number;
		ay_offset: number;
		bx_offset: number;
		by_offset: number;
		prize_x: number;
		prize_y: number;

		constructor(
			id: number,
			ax_offset?: number,
			ay_offset?: number,
			bx_offset?: number,
			by_offset?: number,
			prize_x?: number,
			prize_y?: number,
		) {
			this.id = id;
			this.ax_offset = ax_offset || -1;
			this.ay_offset = ay_offset || -1;
			this.bx_offset = bx_offset || -1;
			this.by_offset = by_offset || -1;
			this.prize_x = prize_x || -1;
			this.prize_y = prize_y || -1;
		}

		set(
			ax_offset?: number,
			ay_offset?: number,
			bx_offset?: number,
			by_offset?: number,
			prize_x?: number,
			prize_y?: number,
		) {
			if (ax_offset) this.ax_offset = ax_offset;
			if (ay_offset) this.ay_offset = ay_offset;
			if (bx_offset) this.bx_offset = bx_offset;
			if (by_offset) this.by_offset = by_offset;
			if (prize_x) this.prize_x = prize_x;
			if (prize_y) this.prize_y = prize_y;
		}

		calculate(): { a: number; b: number; cost?: number } {
			if (
				this.ax_offset !== -1 && this.ay_offset !== -1 &&
				this.bx_offset !== -1 && this.by_offset !== -1 &&
				this.prize_x !== -1 && this.prize_y !== -1
			) {
				const a = (this.prize_x * this.by_offset -
					this.prize_y * this.bx_offset) /
					(this.ax_offset * this.by_offset -
						this.ay_offset * this.bx_offset);
				const b = (this.ax_offset * this.prize_y -
					this.ay_offset * this.prize_x) /
					(this.ax_offset * this.by_offset -
						this.ay_offset * this.bx_offset);

				if (
					(Number.isInteger(a) && Number.isInteger(b) &&
						(a <= 100 || b <= 100))
				) return { a, b, cost: 3 * a + b };
				else return { a: -1, b: -1 };
			} else {
				return { a: -1, b: -1 };
			}
		}
	}

	let i = 0;
	let j = 0;

	const machines: Machine[] = [];
	machines.push(new Machine(0));

	for await (const line of rl) {
		if (i % 4 !== 3) {
			const a_button = line.indexOf('A');
			const b_button = line.indexOf('B');
			const obj = machines.find((m) => m.id === j);

			if (obj) {
				if (a_button !== -1) {
					const l = line.split(' ');
					const x: number = Number(
						l.at(2)?.split('+').at(1)?.slice(0, -1),
					);
					const y: number = Number(l.at(3)?.split('+').at(1));

					obj.ax_offset = x;
					obj.ay_offset = y;
				} else if (b_button !== -1) {
					const l = line.split(' ');
					const x: number = Number(
						l.at(2)?.split('+').at(1)?.slice(0, -1),
					);
					const y: number = Number(l.at(3)?.split('+').at(1));

					obj.bx_offset = x;
					obj.by_offset = y;
				} else {
					const l = line.split(' ');
					const x: number = Number(
						l.at(1)?.split('=').at(1)?.slice(0, -1),
					);
					const y: number = Number(l.at(2)?.split('=').at(1));

					obj.prize_x = x;
					obj.prize_y = y;
				}
			}
		} else {
			j += 1;
			machines.push(new Machine(j));
		}
		i += 1;
	}

	let sum = 0;
	machines.forEach((mac) => {
		const s = mac.calculate();
		if (s.cost) sum += s.cost;
	});

	return sum;
}

async function part2() {
	const rl = readByLine(path);

	class Machine {
		readonly id: number;
		ax_offset: number;
		ay_offset: number;
		bx_offset: number;
		by_offset: number;
		prize_x: number;
		prize_y: number;

		constructor(
			id: number,
			ax_offset?: number,
			ay_offset?: number,
			bx_offset?: number,
			by_offset?: number,
			prize_x?: number,
			prize_y?: number,
		) {
			this.id = id;
			this.ax_offset = ax_offset || -1;
			this.ay_offset = ay_offset || -1;
			this.bx_offset = bx_offset || -1;
			this.by_offset = by_offset || -1;
			this.prize_x = prize_x || -1;
			this.prize_y = prize_y || -1;
		}

		set(
			ax_offset?: number,
			ay_offset?: number,
			bx_offset?: number,
			by_offset?: number,
			prize_x?: number,
			prize_y?: number,
		) {
			if (ax_offset) this.ax_offset = ax_offset;
			if (ay_offset) this.ay_offset = ay_offset;
			if (bx_offset) this.bx_offset = bx_offset;
			if (by_offset) this.by_offset = by_offset;
			if (prize_x) this.prize_x = prize_x;
			if (prize_y) this.prize_y = prize_y;
		}

		calculate(): { a: number; b: number; cost?: number } {
			if (
				this.ax_offset !== -1 && this.ay_offset !== -1 &&
				this.bx_offset !== -1 && this.by_offset !== -1 &&
				this.prize_x !== -1 && this.prize_y !== -1
			) {
				const a = (this.prize_x * this.by_offset -
					this.prize_y * this.bx_offset) /
					(this.ax_offset * this.by_offset -
						this.ay_offset * this.bx_offset);
				const b = (this.ax_offset * this.prize_y -
					this.ay_offset * this.prize_x) /
					(this.ax_offset * this.by_offset -
						this.ay_offset * this.bx_offset);

				if (
					(Number.isInteger(a) && Number.isInteger(b))
				) return { a, b, cost: 3 * a + b };
				else return { a: -1, b: -1 };
			} else {
				return { a: -1, b: -1 };
			}
		}
	}

	let i = 0;
	let j = 0;

	const machines: Machine[] = [];
	machines.push(new Machine(0));

	for await (const line of rl) {
		if (i % 4 !== 3) {
			const a_button = line.indexOf('A');
			const b_button = line.indexOf('B');
			const obj = machines.find((m) => m.id === j);

			if (obj) {
				if (a_button !== -1) {
					const l = line.split(' ');
					const x: number = Number(
						l.at(2)?.split('+').at(1)?.slice(0, -1),
					);
					const y: number = Number(l.at(3)?.split('+').at(1));

					obj.ax_offset = x;
					obj.ay_offset = y;
				} else if (b_button !== -1) {
					const l = line.split(' ');
					const x: number = Number(
						l.at(2)?.split('+').at(1)?.slice(0, -1),
					);
					const y: number = Number(l.at(3)?.split('+').at(1));

					obj.bx_offset = x;
					obj.by_offset = y;
				} else {
					const l = line.split(' ');
					const x: number = Number(
						l.at(1)?.split('=').at(1)?.slice(0, -1),
					);
					const y: number = Number(l.at(2)?.split('=').at(1));

					obj.prize_x = x + 10000000000000;
					obj.prize_y = y + 10000000000000;
				}
			}
		} else {
			j += 1;
			machines.push(new Machine(j));
		}
		i += 1;
	}

	let sum = 0;
	machines.forEach((mac) => {
		const s = mac.calculate();
		if (s.cost) sum += s.cost;
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
