import { readByLine } from "../lib/utils.ts";

const path = "./day02/data.txt";

function isSafe(vals: number[]) {
    let operation: "+" | "-";
    let prev: number | undefined = undefined;
    let valid = true;

    if (Number(vals.at(0)) < Number(vals.at(1))) operation = "+";
    else operation = "-";

    for (const num of vals) {
        if (!prev) prev = num;
        else {
            if (Math.abs(num - prev) > 3 || prev == num) valid = false;
            if (operation == "+") {
                if (prev > num) valid = false;
            } else {
                if (prev < num) valid = false;
            }
            prev = num;
        }
    }

    if (valid) return true;
    else return false;
}

async function part1() {
    const rl = readByLine(path);
    let sum = 0;

    for await (const line of rl) {
        const values = line.split(" ").map(Number);

        if (isSafe(values)) sum += 1;
    }

    return sum;
}

async function part2() {
    const rl = readByLine(path);
    let sum = 0;

    for await (const line of rl) {
        const values = line.split(" ").map(Number);

        if (isSafe(values)) sum += 1;
        else {
            for (let i = 0; i < values.length; i++) {
                const removed: number[] = [
                    ...values.slice(0, i),
                    ...values.slice(i + 1, values.length),
                ];

                if (isSafe(removed)) {
                    sum += 1;
                    break;
                }
            }
        }
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
