import { readByLine } from '../lib/utils.ts';

const path = './day11/data.txt';

async function part1() {
	const rl = readByLine(path);

	const stones: number[] = [];
	for await (const line of rl) {
		if (line) {
			const v = line.split(' ').map(Number);
			stones.push(...v);
		}
	}

	let updated_stones: string[] = [...stones.map((v) => v.toString())];
	for (let i = 0; i < 25; i++) {
		updated_stones = updated_stones.flatMap((x) => {
			if (x === '0') return x = '1';
			else if (x.length % 2 === 0) {
				return [
					`${Number(x.slice(0, x.length / 2))}`,
					`${Number(x.slice(x.length / 2, x.length))}`,
				];
			} else return (Number(x) * 2024).toString();
		});
	}

	return updated_stones.length;
}

async function part2() {
	const rl = readByLine(path);

	let stones = new Map<number, number>();
	let unique_stones = new Set<number>();
	for await (const line of rl) {
		if (line) {
			const v = line.split(' ').map(Number);

			for (const vv of v) {
				stones.set(vv, (stones.get(vv) || 0) + 1);
				unique_stones.add(vv);
			}
		}
	}

	for (let i = 0; i < 75; i++) {
		const store = new Set<number>();
		const stoner = new Map<number, number>(stones);

		unique_stones.forEach((stone) => {
			const count = stones.get(stone);
			if (count !== undefined && count > 0) {
				if (stone === 0) {
					const nval = stoner.get(1) || 0;
					const olval = stoner.get(0) || 0;

					stoner.set(1, nval + (1 * count));
					stoner.set(0, olval - (1 * count));
					store.add(1);
				} else if (stone.toString().length % 2 === 0) {
					const l = Number(
						stone.toString().slice(0, stone.toString().length / 2),
					);
					const r = Number(
						stone.toString().slice(
							stone.toString().length / 2,
							stone.toString().length,
						),
					);
					const lval = stoner.get(l) || 0;
					stoner.set(l, lval + (1 * count));
					const rval = stoner.get(r) || 0;
					stoner.set(r, rval + (1 * count));
					const olval = stoner.get(stone) || 0;

					stoner.set(stone, olval - (1 * count));
					store.add(l);
					store.add(r);
				} else {
					const nval = stoner.get(stone * 2024) || 0;
					const olval = stoner.get(stone) || 0;

					stoner.set(stone * 2024, nval + (1 * count));
					stoner.set(stone, olval - (1 * count));
					store.add(stone * 2024);
				}
			}
		});
		stones = stoner;
		unique_stones = store;
	}

	let sum = 0;
	stones.forEach((v) => sum += v);
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
