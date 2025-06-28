class BooleanBoard {
    width: number;
    height: number;
    board: boolean[];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.board = new Array(width * height).fill(false); // Initialize with `false`
    }

    idx(x: number, y: number): number {
        return x + y * this.width;
    }

    size(): number {
        return this.width * this.height;
    }
}

class GameOfLifeBoard extends BooleanBoard {
    neighbors(x: number, y: number): number {
        let count = 0;

        // Check all 8 possible neighbors
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                // Skip the cell itself
                if (dx === 0 && dy === 0) continue;

                const nx = x + dx;
                const ny = y + dy;

                // Check if the neighbor is within bounds
                if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
                    // If the neighbor is alive (true), increment count
                    if (this.board[this.idx(nx, ny)]) {
                        count++;
                    }
                }
            }
        }

        return count;
    }

    step(): void {
        this.board = this.board.map((_, idx) => {
            const x = idx % this.width;
            const y = Math.floor(idx / this.width);
            const alive = this.board[idx];
            const neighborCount = this.neighbors(x, y);

            // Conway's rules
            return alive
                ? neighborCount === 2 || neighborCount === 3
                : neighborCount === 3;
        });
    }

    // Randomize the board
    randomize(threshold: number = 0.7): void {
        this.board = this.board.map(() => Math.random() > threshold);
    }
}

export { BooleanBoard, GameOfLifeBoard };