import { readByLine } from "../lib/utils.ts";

const path = "./day01/data.txt";

async function part1(): Promise<number> {
    const rl = readByLine(path);
    const firstCol: number[] = [];
    const secondCol: number[] = [];

    for await (const line of rl) {
        // console.log(`Line from file: ${line}`);
        const values = line.split("   ");
        firstCol.push(Number(values?.at(0)));
        secondCol.push(Number(values?.at(1)));
    }

    firstCol.sort((a, b) => a - b);
    secondCol.sort((a, b) => a - b);

    let sum: number = 0;

    for (const number of firstCol) {
        sum += Math.abs(Number(secondCol.at(0)) - number);
        secondCol.shift();
    }

    return sum;
}

async function part2(): Promise<number> {
    const rl = readByLine(path);
    const firstCol: number[] = [];
    const secondCol: number[] = [];

    for await (const line of rl) {
        // console.log(`Line from file: ${line}`);
        const values = line.split("   ");
        firstCol.push(Number(values?.at(0)));
        secondCol.push(Number(values?.at(1)));
    }

    const aCount = new Map(
        [...new Set(secondCol)].map((x) => [
            x,
            secondCol.filter((y) => y === x).length,
        ]),
    );

    let sum: number = 0;

    for (const number of firstCol) {
        sum += number * (aCount.get(number) || 0);
    }

    return sum;
}

Deno.bench({
    name: "Part 1",
    fn: async () => {
        await part1();
    },
});

Deno.bench({
    name: "Part 2",
    fn: async () => {
        await part2();
    },
});

Deno.bench({
    name: "Overall",
    fn: async () => {
        await part1();
        await part2();
    },
});
