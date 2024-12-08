import { popIndex, readByLine } from "../lib/utils.ts";

const path = "./day07/data.txt";

async function part1() {
    const rl = readByLine(path);

    function generatePermutations(values: string[]) {
        const operators = ["*", "+"];
        const numPermutations = Math.pow(operators.length, values.length - 1);
        const permutations = [];

        for (let i = 0; i < numPermutations; i++) {
            const permutation = [];
            let n = i;
            for (let j = 0; j < values.length - 1; j++) {
                permutation.push(operators[n % operators.length]);
                n = Math.floor(n / operators.length);
            }
            permutations.push(permutation);
        }

        return permutations;
    }

    function calculate(
        values: string[],
        permutation: string[],
        result: number,
    ) {
        const final_values: number[] = [];
        // console.log(permutation);
        /*permutation.forEach((p) => {
        const c = [...values];
        values.forEach((v, i) => {
            if (i != 0) {
                const fin = p === "*"
                    ? Number(c[0]) * Number(c[1])
                    : Number(c[0]) + Number(c[1]);
                c[0] = fin.toString();
                popIndex(c, 1);
            }
            // console.log(c);
        });
        final_values.push(Number(c[0]));
    });
    if (final_values.includes(result)) return true;
    return false;*/
        const c = [...values];
        values.forEach((_v, i) => {
            if (i != 0) {
                const fin = permutation[i - 1] === "*"
                    ? Number(c[0]) * Number(c[1])
                    : Number(c[0]) + Number(c[1]);
                c[0] = fin.toString();
                popIndex(c, 1);
            }
        });
        final_values.push(Number(c[0]));

        if (final_values.includes(Number(result))) return true;
        return false;
    }

    let sum = 0;
    for await (const line of rl) {
        const [result, v] = line.split(": ");
        const values = v.split(" ");

        const allPermutations = generatePermutations(values);
        for (const perm of allPermutations) {
            if (calculate(values, perm, Number(result))) {
                sum += Number(result);
                break;
            }
        }
    }

    return sum;
}

async function part2() {
    const rl = readByLine(path);

    function generatePermutations(values: string[]) {
        const operators = ["*", "+", "||"];
        const numPermutations = Math.pow(operators.length, values.length - 1);
        const permutations = [];

        for (let i = 0; i < numPermutations; i++) {
            const permutation = [];
            let n = i;
            for (let j = 0; j < values.length - 1; j++) {
                permutation.push(operators[n % operators.length]);
                n = Math.floor(n / operators.length);
            }
            permutations.push(permutation);
        }

        return permutations;
    }

    function calculate(
        values: string[],
        permutation: string[],
        result: number,
    ) {
        const final_values: number[] = [];
        // console.log(permutation);
        /*permutation.forEach((p) => {
        const c = [...values];
        values.forEach((v, i) => {
            if (i != 0) {
                const fin = p === "*"
                    ? Number(c[0]) * Number(c[1])
                    : Number(c[0]) + Number(c[1]);
                c[0] = fin.toString();
                popIndex(c, 1);
            }
            // console.log(c);
        });
        final_values.push(Number(c[0]));
    });
    if (final_values.includes(result)) return true;
    return false;*/
        const c = [...values];
        values.forEach((_v, i) => {
            if (i != 0) {
                const fin = permutation[i - 1] === "*"
                    ? Number(c[0]) * Number(c[1])
                    : permutation[i - 1] === "+"
                    ? Number(c[0]) + Number(c[1])
                    : Number(c[0] + c[1]);
                c[0] = fin.toString();
                popIndex(c, 1);
            }
        });
        final_values.push(Number(c[0]));

        if (final_values.includes(Number(result))) return true;
        return false;
    }

    let sum = 0;
    for await (const line of rl) {
        const [result, v] = line.split(": ");
        const values = v.split(" ");

        const allPermutations = generatePermutations(values);
        for (const perm of allPermutations) {
            if (calculate(values, perm, Number(result))) {
                sum += Number(result);
                break;
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
