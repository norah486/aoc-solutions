import { readByLine } from "../../lib/utils.ts";

const path = "./2025-day01/data.txt";

async function part1(): Promise<number> {
  const rl = readByLine(path);

  let current: number = 50;
  const movements: string[] = [];

  for await (const line of rl) {
    movements.push(line);
  }

  let occ = 0;
  for (const m of movements) {
    const dir = m.substring(0, 1);
    const num: number = Number(m.substring(1));

    if (dir === "L") current -= num % 100;
    if (dir === "R") current += num % 100;
    if (current < 0) current += 100;
    if (current > 99) current -= 100;
    if (current === 0) occ += 1;
  }

  return occ;
}

async function part2(): Promise<number> {
  const rl = readByLine(path);

  let current: number = 50;
  const movements: string[] = [];

  for await (const line of rl) {
    movements.push(line);
  }

  let occ = 0;
  for (const m of movements) {
    const dir = m.substring(0, 1);
    const num: number = Number(m.substring(1));

    if (dir === "R") {
      for (let i = 0; i < num; i++) {
        current += 1;
        if (current > 99) current -= 100;
        if (current === 0) occ += 1;
      }
    } else {
      for (let i = 0; i < num; i++) {
        current -= 1;
        if (current < 0) current += 100;
        if (current === 0) occ += 1;
      }
    }
  }
  return occ;
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
	name: 'Overall',
	fn: async () => {
		await part1();
		await part2();
	},
});
