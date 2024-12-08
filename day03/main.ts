import { readByLine } from "../lib/utils.ts";

const path = "./day03/data.txt";

async function part1() {
    const rl = readByLine(path);
    const pattern = /mul\(\d*,\d*\)/g;

    let sum = 0;

    for await (const line of rl) {
        const arr = [...line.matchAll(pattern)];
        const d = arr.map((d) => d.at(0));

        for (const mul of d) {
            const num1 = Number(
                mul?.slice(mul.indexOf("(") + 1, mul.indexOf(",")),
            );
            const num2 = Number(
                mul?.slice(mul.indexOf(",") + 1, mul.indexOf(")")),
            );

            sum += num1 * num2;
        }
    }

    return sum;
}

async function part2() {
    const rl = readByLine(path);
    const pattern = /mul\(\d*,\d*\)|do\(\)|don\'t\(\)/gm;

    let sum = 0;

    let allowed = true;
    for await (const line of rl) {
        const arr = [...line.matchAll(pattern)];
        const d = arr.map((d) => d.at(0));

        for (const mul of d) {
            if (mul === "don't()") allowed = false;
            if (mul === "do()") allowed = true;
            if (mul?.startsWith("mul") && allowed) {
                const num1 = Number(
                    mul?.slice(mul.indexOf("(") + 1, mul.indexOf(",")),
                );
                const num2 = Number(
                    mul?.slice(mul.indexOf(",") + 1, mul.indexOf(")")),
                );

                sum += num1 * num2;
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
    name: "Both",
    fn: async () => {
        await part1();
        await part2();
    },
});
