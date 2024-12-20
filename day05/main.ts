import { findMiddleElements, readByLine } from '../lib/utils.ts';

const path = './day05/data.txt';

async function part1() {
	const rl = readByLine(path);

	const rules: string[][] = [];
	const steps_c: string[][] = [];
	for await (const line of rl) {
		if (line && !line.includes(',')) {
			const r = line.split('|');
			rules.push([r[0], r[1]]);
		} else if (line && line.includes(',')) {
			const s = line.split(',');
			steps_c.push(s);
		}
	}

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

	return sum;
}

async function part2() {
	const rl = readByLine(path);

	const rules: string[][] = [];
	const steps_c: string[][] = [];
	for await (const line of rl) {
		if (line && !line.includes(',')) {
			const r = line.split('|');
			rules.push([r[0], r[1]]);
		} else if (line && line.includes(',')) {
			const s = line.split(',');
			steps_c.push(s);
		}
	}

	function isValid(
		steps: string[],
	): { valid: boolean; broken_rules: string[][] } {
		let valid = true;
		const printed_numbers: string[] = [];
		const broken_rules: string[][] = [];
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
		return { valid, broken_rules };
	}

	let sum = 0;
	for (const steps of steps_c) {
		let { valid, broken_rules } = isValid(steps);

		const copy = [...steps];
		while (!valid) {
			broken_rules.forEach((br_rule, j) => {
				if (j === 0) {
					const a = copy.findIndex((s) => s === br_rule.at(0));
					const b = copy.findIndex((s) => s === br_rule.at(1));

					copy[a] = br_rule.at(1)!;
					copy[b] = br_rule.at(0)!;
				}
			});

			valid = isValid(copy).valid;
			broken_rules = isValid(copy).broken_rules;

			if (valid) {
				const number = [findMiddleElements(copy)];
				sum += Number(number);
			}
		}
	}

	return sum;
}

Deno.bench({
	name: 'Part 1',
	fn: async () => {
		await part1();
	},
});

Deno.bench({
	name: 'Part 2',
	fn: async () => {
		await part2();
	},
});

Deno.bench({
	name: 'Both',
	fn: async () => {
		await part1();
		await part2();
	},
});
