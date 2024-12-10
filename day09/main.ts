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
    // const ids = new Map<number, number>();

    for (let i = 0; i < full.length; i++) {
        // if (i % 2 !== 0) converted += ".".repeat(Number(full[i]));
        if (i % 2 !== 0) {
            for (let j = 0; j < Number(full[i]); j++) {
                converted.push(".");
            }
        } else {
            // const id = ids.get(2) ? ids.get(2) : ids.set(2, 3);
            // let id = ids.get(Number(full[i]));
            // if (!id) {
            //     ids.set(Number(full[i]), ids.size);
            //     converted += (ids.size - 1).toString().repeat(Number(full[i]));
            // } else {
            //     converted += id.toString().repeat(Number(full[i]));
            // }
            // if (id >= 10) {
            //     const id = ids.get(Number(full[i]));
            //     converted += id!.toString().repeat(Number(full[i]));
            // } else {
            //     converted += id.toString().repeat(Number(full[i]));
            //     ids.set(Number(full[i]), id);
            // }
            for (let j = 0; j < Number(full[i]); j++) {
                converted.push(id.toString());
            }
            id += 1;
        }
    }

    // console.log(JSON.stringify(converted));

    // console.log(ids);
    // console.log(converted);

    const stored_positions: number[] = [];
    for (let i = converted.length - 1; i >= 0; i--) {
        // console.log(`GOIN ${i} out of ${converted.length}`);
        if (stored_positions.includes(i - 1)) break;
        if (converted[i] !== ".") {
            const pos = converted.indexOf(".");
            // converted = replaceAt(converted, converted[i], pos);
            // converted = replaceAt(converted, ".", i);
            converted[pos] = converted[i];
            converted[i] = ".";
            stored_positions.push(pos);
        }
    }

    // console.log(converted);

    const conv_num = converted.filter((v) => v !== ".");

    // console.log(converted.toString().replaceAll(",", ""));
    //converted = converted.replaceAll(".", "");

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
    // const positions = new Map<number, number[]>();

    for (let i = 0; i < full.length; i++) {
        if (i % 2 !== 0) {
            // for (let j = 0; j < Number(full[i]); j++) {
            // }
            converted.push(".".repeat(Number(full[i])));
            //for (let j = 0; j < Number(full[i]); j++) {
            //    converted.push(".");
            //}
        } else {
            // for (let j = 0; j < Number(full[i]); j++) {
            //     // if (j === 0) positions.set(id, [converted.length]);
            //     converted.push(id.toString());
            //     // if (j === Number(full[i]) - 1) {
            //     //     positions.get(id)!.push(converted.length - 1);
            //     // }
            // }
            // positions.set(id, [])
            converted.push(`${id};`.repeat(Number(full[i])).slice(0, -1));
            id += 1;
        }
    }

    //console.log(JSON.stringify(converted));
    //console.log(positions);

    // console.log(converted.filter((v) => v.includes("."))[0]);

    const stored_positions: number[] = [];
    const iterated_ids: number[] = [];

    // console.log(JSON.stringify(converted));
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

    // for (let i = positions.size - 1; i >= 0; i--) {
    // console.log(positions.get(i));
    //}

    // console.log(JSON.stringify(converted));

    //console.log();
    for (let i = converted.length - 1; i >= 0; i--) {
        // if (stored_positions.includes(i - 1)) break;
        if (
            !converted[i].includes(".") &&
            //!converted[i].split(";").includes(iterated_ids.toString()) &&
            !iterated_ids.includes(Number(converted[i].split(";")[1]))
            //converted[i] !== "." // &&
            // (i === converted.length - 1 ||
            //     i === converted.length - 2 || i === converted.length - 3 ||
            //     i === converted.length - 4)
        ) {
            const pos = new_one.indexOf(
                new_one.filter((v) =>
                    v.includes(".") &&
                    v.length >= converted[i].split(";").length
                )[0],
            );

            // console.log(
            //     JSON.stringify(new_one),
            //     pos,
            //     pos === -1 ? "gone" : new_one[pos].length,
            //     converted[i].length,
            //     converted[i],
            //     pos === -1
            //         ? "discarded"
            //         : converted[i].replaceAll(";", "").length <=
            //             new_one[pos].length,
            // );

            if (pos !== -1) {
                const stored_value = converted[i];
                // new_one = new_one.filter((v) => v !== new_one[i]);
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
                        // console.log(JSON.stringify(new_one));
                        // console.log(new_one[pos + 1].length);
                        // console.log(new_one[pos].replaceAll(";", "").length);

                        new_one[pos + 1] = new_one[pos + 1].slice(
                            new_one[pos].split(";").length,
                            new_one[pos + 1].length,
                        );

                        // console.log(JSON.stringify(new_one));
                    }
                }
                stored_positions.push(pos);
                iterated_ids.push(Number(stored_value.split(";")[0]));
            }

            // if (converted[i].length <= new_one[pos].length) {
            //     new_one = converted.toSpliced(pos, 0, converted[i]);
            //     new_one[i + 1] = ".".repeat(converted[pos].length);
            //     new_one[pos + 1] = converted[pos].slice(
            //         0,
            //         new_one[pos].length - 1,
            //     );
            //     stored_positions.push(pos);
            // }
            // if (converted.indexOf(".".repeat(converted[i].length)) !== -1) {
            //     const pos = converted.indexOf(".".repeat(converted[i].length));
            //     // converted = replaceAt(converted, converted[i], pos);
            //     // converted = replaceAt(converted, ".", i);
            //     converted[pos] = converted[i];
            //     converted[i] = ".";
            //     stored_positions.push(pos);
            // }
        }
    }
    /*
console.log();
console.log(JSON.stringify(new_one));
// console.log(new_one.toString().replaceAll(",", ""));
console.log(new_one.toString().replaceAll(",", "").replaceAll(";", ""));
    */
    const by_id: string[] = [];
    // const convertv2 = new_one.filter((v) => !v.includes("."));

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

    // console.log(JSON.stringify(by_id));
    // console.log(by_id.toString().replaceAll(",", "").replaceAll(";", ""));

    let sum = 0;
    for (let i = 0; i < by_id.length; i++) {
        // console.log(conv_num);
        if (by_id[i] !== ".") {
            // console.log(`${i} * ${by_id[i]}`);
            sum += i * Number(by_id[i]);
        }
    }

    return sum;

    /*
const stored_positions: number[] = [];
for (let i = converted.length - 1; i >= 0; i--) {
    console.log(`GOIN ${i} out of ${converted.length}`);
    if (stored_positions.includes(i - 1)) break;
    if (converted[i] !== ".") {
        if (converted.indexOf(".".repeat(converted[i].length)) !== -1) {
            const pos = converted.indexOf(".".repeat(converted[i].length));
            // converted = replaceAt(converted, converted[i], pos);
            // converted = replaceAt(converted, ".", i);
            converted[pos] = converted[i];
            converted[i] = ".";
            stored_positions.push(pos);
        }
    }
}
    */

    // const conv_num = new_one.filter((v) => !v.includes("."));
    /*
const conv_num = "00992111777.44.333....5555.6666.....8888..";
console.log(conv_num);

// console.log(converted.toString().replaceAll(",", ""));
//converted = converted.replaceAll(".", "");

let sum = 0;
for (let i = 0; i < conv_num.length; i++) {
    // console.log(conv_num);
    if (conv_num[i] !== ".") sum += i * Number(conv_num[i]);
}

console.log(sum);
    */

    /*
const test = ["2", "..", "....", "5"];

console.log(test);
for (let i = 0; i < test.length; i++) {
    if (test[i].includes(".") && test[i - 1].includes(".")) {
        test[i] = test[i].concat(test[i - 1]);
        popIndex(test, i - 1);
    }
}

console.log(test);
    */

    /*
const test = ["2", "...", "33"];
console.log(test[1] = test[1].slice(0, 1));
console.log(test);
    */
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
