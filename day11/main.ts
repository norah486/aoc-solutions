import { readByLine } from "../lib/utils.ts";

const path = "./day11/data.txt";

async function part1() {
    const rl = readByLine(path);

    const stones: number[] = [];
    for await (const line of rl) {
        if (line) {
            const v = line.split(" ").map(Number);
            stones.push(...v);
        }
    }

    // console.log(stones);

    const updated_stones: string[] = [...stones.map((v) => v.toString())];
    for (let i = 0; i < 25; i++) {
        updated_stones.forEach((stone, j) => {
            if (Number(stone) === 0) {
                updated_stones[j] = "1";
            } else if (stone.length % 2 === 0) {
                const length = updated_stones[j].toString().length;
                const l = Number(
                    updated_stones[j].toString().slice(0, length / 2),
                );
                const r = Number(
                    updated_stones[j].toString().slice(length / 2, length),
                );
                updated_stones[j] = `${l};${r}`;
            } else {
                updated_stones[j] = (Number(updated_stones[j]) * 2024)
                    .toString();
            }
        });

        for (const x of updated_stones) {
            if (x.includes(";")) {
                const ind = updated_stones.findIndex((v) => v === x);
                const d = x.split(";");
                updated_stones[ind] = d[0];
                updated_stones.splice(ind + 1, 0, d[1]);
            }
        }
    }

    console.log(updated_stones.length);
}

async function part2() {
    const rl = readByLine(path);

    // const stones: number[] = [];
    let stones = new Map<number, number>();
    let unique_stones = new Set<number>();
    for await (const line of rl) {
        if (line) {
            const v = line.split(" ").map(Number);

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

        // let sum = 0;
        // stones.forEach((v) => sum += v);
        // console.log(`${i + 1} \t- ${sum}`);
    }

    // console.log(stones);
    let sum = 0;
    stones.forEach((v) => sum += v);
    console.log(sum);
}
/*
// console.log(stones);

let updated_stones: string[] = [...stones.map((v) => v.toString())];
for (let i = 0; i < 75; i++) {
    updated_stones = updated_stones.flatMap((x) => {
        if (x === "0") return x = "1";
        else if (x.length % 2 === 0) {
            return [
                `${Number(x.slice(0, x.length / 2))}`,
                `${Number(x.slice(x.length / 2, x.length))}`,
            ];
        } else return (Number(x) * 2024).toString();
    });

    // updated_stones = updated_stones.flatMap((i) => i.split(";"));

    // console.log(updated_stones);
    console.log(`${i + 1}/25`);
}

console.log(updated_stones.length);
*/
