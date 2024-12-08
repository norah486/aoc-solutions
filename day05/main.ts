import { findMiddleElements, readByLine } from "../lib/utils.ts";

const path = "./day05/testdata.txt";

const rl = readByLine(path);

const rules: string[][] = [];
const steps_c: string[][] = [];
for await (const line of rl) {
    if (line && !line.includes(",")) {
        const r = line.split("|");
        rules.push([r[0], r[1]]);
    } else if (line && line.includes(",")) {
        const s = line.split(",");
        steps_c.push(s);
    }
}

// deno-lint-ignore no-unused-vars
function part1() {
    let sum = 0;

    for (const steps of steps_c) {
        let valid = true;
        const printed_numbers: string[] = [];
        steps.forEach((step) => {
            const values = rules.filter((v) => v.at(1) === step.toString());
            if (values) {
                for (const rule of values) {
                    if (
                        steps.includes(rule.at(0)!.toString()) &&
                        !printed_numbers.includes(rule.at(0)!.toString())
                    ) {
                        valid = false;
                    }
                }
            }
            printed_numbers.push(step);
        });
        if (valid) {
            const [number] = findMiddleElements(steps);
            sum += Number(number);
        }
    }

    console.log(sum);
}

const _sum = 0;

for (const steps of steps_c) {
    let valid = true;
    const printed_numbers: string[] = [];
    const broken_rules: string[][] = [];
    const _test: string[] = [];
    steps.forEach((step) => {
        const values = rules.filter((v) => v.at(1) === step.toString());
        if (values) {
            for (const rule of values) {
                if (
                    steps.includes(rule.at(0)!.toString()) &&
                    !printed_numbers.includes(rule.at(0)!.toString())
                ) {
                    broken_rules.push(rule);
                    valid = false;
                }
            }
        }
        printed_numbers.push(step);
    });
    if (!valid) {
        console.log(steps);
        console.log(broken_rules);
    }
}
