import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";

interface ControlPanelProps {
    isPlaying: boolean;
    onPlayPause: () => void;
    onStep: () => void;
    onReset: () => void;
    speed: number;
    onSpeedChange: (speed: number) => void;
}

export function ControlPanel({
    isPlaying,
    onPlayPause,
    onStep,
    onReset,
    speed,
    onSpeedChange,
}: ControlPanelProps) {
    return (
        <div className="glass-card p-4 flex flex-col gap-4">
            <div className="flex items-center justify-center gap-4">
                <button
                    onClick={onPlayPause}
                    className="p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-all shadow-lg hover:shadow-primary/50"
                    title="Play/Pause"
                >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button
                    onClick={onStep}
                    disabled={isPlaying}
                    className="p-3 bg-muted hover:bg-muted/80 text-foreground rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Step Forward"
                >
                    <SkipForward size={24} />
                </button>
                <button
                    onClick={onReset}
                    className="p-3 bg-muted hover:bg-muted/80 text-foreground rounded-full transition-all"
                    title="Reset"
                >
                    <RotateCcw size={24} />
                </button>
            </div>

            <div className="flex items-center gap-4 px-2">
                <span className="text-sm font-medium text-muted-foreground w-12">
                    Speed
                </span>
                <input
                    type="range"
                    min="1"
                    max="100"
                    value={speed}
                    onChange={(e) => onSpeedChange(Number(e.target.value))}
                    className="flex-1 accent-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-medium text-foreground w-12 text-right">
                    {speed}%
                </span>
            </div>
        </div>
    );
}
