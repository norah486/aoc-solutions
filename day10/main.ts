import { readByLine } from "../lib/utils.ts";

const path = "./day10/data.txt";

async function part1() {
    const rl = readByLine(path);

    const grid: number[][] = [];
    const positions: number[][] = [];

    let line_c = 0;
    for await (const line of rl) {
        if (line) {
            const d = line.split("").map(Number);

            d.reduce((_acc: never[], val, index) => {
                if (val === 0) positions.push([index, line_c]);
                return [];
            }, []);

            grid.push(d);
            line_c += 1;
        }
    }

    const all_9s: number[] = [];

    for (const ff of positions) {
        const [og_x, og_y] = [ff[0], ff[1]];
        const positions_check: number[][] = [[og_x, og_y]];

        let sum_9s = 0;
        const checked_9s: number[][] = [];
        for (const p of positions_check) {
            const [x, y] = [p[0], p[1]];
            const val = grid[y][x];

            if (
                val === 9 &&
                !(checked_9s.filter((v) => v[0] === x && v[1] === y).length > 0)
            ) {
                checked_9s.push([x, y]);
                sum_9s += 1;
            } else {
                const up = grid[y - 1]?.[x];
                const right = grid[y]?.[x + 1];
                const left = grid[y]?.[x - 1];
                const down = grid[y + 1]?.[x];

                if (up === val + 1) positions_check.push([x, y - 1]);
                if (right === val + 1) positions_check.push([x + 1, y]);
                if (left === val + 1) positions_check.push([x - 1, y]);
                if (down === val + 1) positions_check.push([x, y + 1]);
            }
        }
        all_9s.push(sum_9s);
    }

    return all_9s.reduce((x, y) => x + y);
}

async function part2() {
    const rl = readByLine(path);

    const grid: number[][] = [];
    const positions: number[][] = [];

    let line_c = 0;
    for await (const line of rl) {
        if (line) {
            const d = line.split("").map(Number);

            d.reduce((_acc: never[], val, index) => {
                if (val === 0) positions.push([index, line_c]);
                return [];
            }, []);

            grid.push(d);
            line_c += 1;
        }
    }

    const all_9s: number[] = [];

    for (const ff of positions) {
        const [og_x, og_y] = [ff[0], ff[1]];
        const positions_check: number[][] = [[og_x, og_y]];

        let sum_9s = 0;
        for (const p of positions_check) {
            const [x, y] = [p[0], p[1]];
            const val = grid[y][x];

            if (val === 9) {
                sum_9s += 1;
            } else {
                const up = grid[y - 1]?.[x];
                const right = grid[y]?.[x + 1];
                const left = grid[y]?.[x - 1];
                const down = grid[y + 1]?.[x];

                if (up === val + 1) positions_check.push([x, y - 1]);
                if (right === val + 1) positions_check.push([x + 1, y]);
                if (left === val + 1) positions_check.push([x - 1, y]);
                if (down === val + 1) positions_check.push([x, y + 1]);
            }
        }
        all_9s.push(sum_9s);
    }

    return all_9s.reduce((x, y) => x + y);
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
