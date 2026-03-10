import Link from "next/link";
import { Code2, Sun, Moon } from "lucide-react";
import { useTheme } from "./Providers";

export function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="fixed top-0 w-full z-50 glass px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="bg-primary/20 p-2 rounded-xl text-primary">
                    <Code2 size={24} />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    DS Visualizer
                </span>
            </div>

            <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
                <li>
                    <Link href="/" className="text-foreground/80 hover:text-primary transition-colors">
                        Home
                    </Link>
                </li>
                <li className="group relative">
                    <span className="text-foreground/80 hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
                        Data Structures
                    </span>
                    <div className="absolute top-full -left-4 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                        <div className="glass-card p-2 min-w-[200px] flex flex-col gap-1">
                            <Link href="/visualize/stack" className="px-4 py-2 hover:bg-primary/10 [.light_&]:bg-[#007AFF]/10 rounded-lg transition-colors">Stack</Link>
                            <Link href="/visualize/queue" className="px-4 py-2 hover:bg-primary/10 [.light_&]:bg-[#007AFF]/10 rounded-lg transition-colors">Queue</Link>
                            <Link href="/visualize/linked-list" className="px-4 py-2 hover:bg-primary/10 [.light_&]:bg-[#007AFF]/10 rounded-lg transition-colors">Linked List</Link>
                            <Link href="/visualize/tree" className="px-4 py-2 hover:bg-primary/10 [.light_&]:bg-[#007AFF]/10 rounded-lg transition-colors">Binary Tree</Link>
                        </div>
                    </div>
                </li>
                <li className="group relative">
                    <span className="text-foreground/80 hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
                        Algorithms
                    </span>
                    <div className="absolute top-full -left-4 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                        <div className="glass-card p-2 min-w-[200px] flex flex-col gap-1">
                            <Link href="/visualize/sorting" className="px-4 py-2 hover:bg-primary/10 [.light_&]:bg-[#007AFF]/10 rounded-lg transition-colors">Sorting Algorithms</Link>
                            <Link href="/visualize/search" className="px-4 py-2 hover:bg-primary/10 [.light_&]:bg-[#007AFF]/10 rounded-lg transition-colors">Searching Algorithms</Link>
                            <Link href="/visualize/hanoi" className="px-4 py-2 hover:bg-primary/10 [.light_&]:bg-[#007AFF]/10 rounded-lg transition-colors">Tower of Hanoi</Link>
                            <div className="h-px bg-white/5 [.light_&]:bg-black/5 my-1" />
                            <Link href="/visualize/sorting" className="px-4 py-2 text-[10px] text-muted-foreground uppercase tracking-widest pointer-events-none">Includes: Bubble, Selection, Insertion, Merge, Quick</Link>
                        </div>
                    </div>
                </li>
            </ul>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-xl bg-white/5 [.light_&]:bg-black/5 border border-white/10 [.light_&]:border-black/10 hover:bg-white/10 [.light_&]:hover:bg-black/10 transition-all text-foreground"
                    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <div className="w-px h-6 bg-white/10 hidden md:block" />
                <div className="hidden md:block w-24" /> {/* Space balancer */}
            </div>
        </nav>
    );
}
