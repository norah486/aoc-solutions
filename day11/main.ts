import { readByLine } from "../lib/utils.ts";

const path = "./day11/data.txt";

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
            const l = Number(updated_stones[j].toString().slice(0, length / 2));
            const r = Number(
                updated_stones[j].toString().slice(length / 2, length),
            );
            updated_stones[j] = `${l};${r}`;
        } else {
            updated_stones[j] = (Number(updated_stones[j]) * 2024).toString();
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
