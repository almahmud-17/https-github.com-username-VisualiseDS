export type HanoiMove = {
    diskId: number;
    from: number;
    to: number;
    description: string;
};

export type HanoiStep = {
    pegs: number[][]; // Peg 0, 1, 2 containing disk IDs
    move?: HanoiMove;
};

export function getHanoiSteps(numDisks: number): HanoiStep[] {
    const steps: HanoiStep[] = [];
    const pegs: number[][] = [
        Array.from({ length: numDisks }, (_, i) => numDisks - i),
        [],
        []
    ];

    // Initial state
    steps.push({
        pegs: pegs.map(p => [...p]),
    });

    function solve(n: number, from: number, to: number, aux: number) {
        if (n === 1) {
            const disk = pegs[from].pop()!;
            pegs[to].push(disk);
            steps.push({
                pegs: pegs.map(p => [...p]),
                move: {
                    diskId: disk,
                    from,
                    to,
                    description: `Move disk ${disk} from Peg ${String.fromCharCode(65 + from)} to Peg ${String.fromCharCode(65 + to)}`
                }
            });
            return;
        }

        solve(n - 1, from, aux, to);

        const disk = pegs[from].pop()!;
        pegs[to].push(disk);
        steps.push({
            pegs: pegs.map(p => [...p]),
            move: {
                diskId: disk,
                from,
                to,
                description: `Move disk ${disk} from Peg ${String.fromCharCode(65 + from)} to Peg ${String.fromCharCode(65 + to)}`
            }
        });

        solve(n - 1, aux, to, from);
    }

    solve(numDisks, 0, 2, 1);
    return steps;
}
