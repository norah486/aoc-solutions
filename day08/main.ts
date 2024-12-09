import { readByLine } from "../lib/utils.ts";

const path = "./day08/data.txt";

async function part1() {
    const rl = readByLine(path);

    const grid: string[][] = [];
    for await (const line of rl) {
        const d = line.split("");
        grid.push(d);
    }

    const all_coords = new Map<string, number[][]>();
    grid.forEach((l, y) => {
        l.forEach((c, x) => {
            if (c === "." || !c) return;
            else if (all_coords.has(c)) {
                all_coords.get(c)?.push([x, y]);
            } else {
                all_coords.set(c, [[x, y]]);
            }
        });
    });
    for (const c of all_coords) {
        const cood = c[1];
        for (const coords of cood) {
            const [x, y] = coords;
            const checks = cood.filter((v) => v !== coords);

            for (const check of checks) {
                const [xx, yy] = check;

                const dx = x - xx;
                const dy = y - yy;

                // console.log(
                //     checks,
                //     `${x}, ${y}, attempts antinode at ${x + dx}, ${y + dy}`,
                // );

                // if (y + dy < 0 || y + dy > grid.length) {
                //     console.log(
                //         `Y: Could not place antinode at ${x + dx}, ${y + dy}`,
                //     );
                //     break;
                // }
                // if (x + dx < 0 || x + dx > grid[y + dy].length) {
                //     console.log(
                //         `X: Could not place antinode at ${x + dx}, ${y + dy}`,
                //     );
                //     break;
                // }

                if (
                    !(y + dy < 0 || y + dy >= grid.length) &&
                    !(x + dx < 0 || x + dx >= grid[y + dy].length)
                ) {
                    // console.log(
                    //     `From ${x}, ${y} placing antinode at ${x + dx}, ${y + dy}`,
                    // );
                    grid[y + dy][x + dx] = "#";
                }
            }
        }
    }

    let sum = 0;

    grid.forEach((l) => {
        l.forEach((c) => {
            if (c === "#") sum += 1;
        });
        // console.log(l.toString().replaceAll(",", ""));
    });

    return sum;
}

async function part2() {
    const rl = readByLine(path);
    const grid: string[][] = [];
    for await (const line of rl) {
        const d = line.split("");
        grid.push(d);
    }

    const all_coords = new Map<string, number[][]>();
    grid.forEach((l, y) => {
        l.forEach((c, x) => {
            if (c === "." || !c) return;
            else if (all_coords.has(c)) {
                all_coords.get(c)?.push([x, y]);
            } else {
                all_coords.set(c, [[x, y]]);
            }
        });
    });

    for (const c of all_coords) {
        const cood = c[1];
        for (const coords of cood) {
            const [x, y] = coords;
            const checks = cood.filter((v) => v !== coords);

            if (checks.length > 0) grid[y][x] = "#";

            for (const check of checks) {
                const [xx, yy] = check;

                const dx = x - xx;
                const dy = y - yy;

                // console.log(dx, dy);
                // console.log(x + dx, y + dy);
                // console.log();

                for (let j = 1; j < 100; j++) {
                    if (
                        !(y + (dy * j) < 0 || y + (dy * j) >= grid.length) &&
                        !(x + (dx * j) < 0 ||
                            x + (dx * j) >= grid[y + (dy * j)].length)
                    ) {
                        // console.log(
                        //     `From ${x}, ${y} placing antinode at ${x + dx}, ${y + dy}`,
                        // );
                        grid[y + dy * j][x + dx * j] = "#";
                    }
                }

                /*
            console.log(
                checks,
                `${x}, ${y}, attempts antinode at ${x + dx}, ${y + dy}`,
            );

            if (
                !(y + dy < 0 || y + dy >= grid.length) &&
                !(x + dx < 0 || x + dx >= grid[y + dy].length)
            ) {
                // console.log(
                //     `From ${x}, ${y} placing antinode at ${x + dx}, ${y + dy}`,
                // );
                grid[y + dy][x + dx] = "#";
            }
                */
            }
        }
    }

    let sum = 0;
    grid.forEach((l) => {
        l.forEach((c) => {
            if (c === "#") sum += 1;
        });
        // console.log(l.toString().replaceAll(",", ""));
    });
    // console.log(sum);
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
