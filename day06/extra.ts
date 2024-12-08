export function check_loop(r_grid: string[][], xx: number, yy: number) {
    let real_dir = "^";
    const checked_positions = new Map();
    while (
        r_grid.some(
            (line) =>
                line.includes("^") ||
                line.includes(">") ||
                line.includes("v") ||
                line.includes("<"),
        ) &&
        yy > 0
    ) {
        if (checked_positions.has(`${xx},${yy}`)) {
            const ttt = checked_positions.get(`${xx},${yy}`);
            if (ttt.includes(real_dir)) {
                return true;
            }
            checked_positions.get(`${xx},${yy}`).push(real_dir);
        } else {
            checked_positions.set(`${xx},${yy}`, [real_dir]);
        }

        if (real_dir === "^") {
            if (r_grid[yy - 1][xx] === "#") {
                real_dir = ">";
            } else {
                r_grid[yy][xx] = "X";
                r_grid[yy - 1][xx] = "^";
                yy -= 1;
            }
        }
        if (real_dir === ">") {
            if (xx + 2 > r_grid[yy].length) break;
            if (r_grid[yy][xx + 1] === "#") {
                real_dir = "v";
            } else {
                r_grid[yy][xx] = "X";
                r_grid[yy][xx + 1] = ">";
                xx += 1;
            }
        }
        if (real_dir === "v") {
            if (yy + 2 > r_grid.length) break;
            if (r_grid[yy + 1][xx] === "#") {
                real_dir = "<";
            } else {
                r_grid[yy][xx] = "X";
                r_grid[yy + 1][xx] = "v";
                yy += 1;
            }
        }
        if (real_dir === "<") {
            if (xx - 1 === -1) break;
            if (r_grid[yy][xx - 1] === "#") {
                real_dir = "^";
            } else {
                r_grid[yy][xx] = "X";
                r_grid[yy][xx - 1] = "<";
                xx -= 1;
            }
        }
    }
    return false;
}
