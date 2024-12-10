import { popIndex } from "../lib/utils.ts";
import { readByLine } from "../lib/utils.ts";

const path = "./day09/data.txt";

async function part1() {
    const rl = readByLine(path);

    let full: string = "";
    for await (const line of rl) {
        if (line) full = line;
    }

    const converted: string[] = [];
    let id = 0;

    for (let i = 0; i < full.length; i++) {
        if (i % 2 !== 0) {
            for (let j = 0; j < Number(full[i]); j++) {
                converted.push(".");
            }
        } else {
            for (let j = 0; j < Number(full[i]); j++) {
                converted.push(id.toString());
            }
            id += 1;
        }
    }

    const stored_positions: number[] = [];
    for (let i = converted.length - 1; i >= 0; i--) {
        if (stored_positions.includes(i - 1)) break;
        if (converted[i] !== ".") {
            const pos = converted.indexOf(".");
            converted[pos] = converted[i];
            converted[i] = ".";
            stored_positions.push(pos);
        }
    }

    const conv_num = converted.filter((v) => v !== ".");

    let sum = 0;
    for (let i = 0; i < conv_num.length; i++) {
        // console.log(conv_num);
        sum += i * Number(conv_num[i]);
    }
    return sum;
}

async function part2() {
    const rl = readByLine(path);

    let full: string = "";
    for await (const line of rl) {
        if (line) full = line;
    }

    let converted: string[] = [];
    let id = 0;

    for (let i = 0; i < full.length; i++) {
        if (i % 2 !== 0) {
            converted.push(".".repeat(Number(full[i])));
        } else {
            converted.push(`${id};`.repeat(Number(full[i])).slice(0, -1));
            id += 1;
        }
    }

    const stored_positions: number[] = [];
    const iterated_ids: number[] = [];

    converted = [...converted.filter((v) => v.length > 0)];

    for (let i = 0; i < converted.length; i++) {
        if (converted[i] && converted[i - 1]) {
            if (converted[i].includes(".") && converted[i - 1].includes(".")) {
                converted[i] = converted[i].concat(converted[i - 1]);
                popIndex(converted, i - 1);
            }
        }
    }

    let new_one: string[] = [...converted];

    for (let i = converted.length - 1; i >= 0; i--) {
        if (
            !converted[i].includes(".") &&
            !iterated_ids.includes(Number(converted[i].split(";")[1]))
        ) {
            const pos = new_one.indexOf(
                new_one.filter((v) =>
                    v.includes(".") &&
                    v.length >= converted[i].split(";").length
                )[0],
            );

            if (pos !== -1) {
                const stored_value = converted[i];
                const old_pos = new_one.findIndex((v) => v === stored_value);
                if (pos < old_pos) {
                    new_one[old_pos] = ".".repeat(
                        stored_value.split(";").length,
                    );
                    new_one = new_one.toSpliced(pos, 0, stored_value);

                    if (
                        new_one[pos + 1].length ===
                            converted[i].split(";").length
                    ) {
                        popIndex(new_one, pos + 1);
                    } else {
                        new_one[pos + 1] = new_one[pos + 1].slice(
                            new_one[pos].split(";").length,
                            new_one[pos + 1].length,
                        );
                    }
                }
                stored_positions.push(pos);
                iterated_ids.push(Number(stored_value.split(";")[0]));
            }
        }
    }

    const by_id: string[] = [];

    for (const value of new_one) {
        const split = value.split(";");

        for (const s of split) {
            if (s.includes(".")) {
                const dsplit = s.split("");
                for (const vv of dsplit) {
                    by_id.push(vv);
                }
            } else {
                by_id.push(s);
            }
        }
    }

    let sum = 0;
    for (let i = 0; i < by_id.length; i++) {
        if (by_id[i] !== ".") {
            sum += i * Number(by_id[i]);
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
