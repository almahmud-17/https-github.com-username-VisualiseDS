"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { InputPanel } from "@/components/InputPanel";
import { CodePanel } from "@/components/CodePanel";
import { LogicBreakdown } from "@/components/LogicBreakdown";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { Trash2, Eye, RotateCcw } from "lucide-react";

const QUEUE_ALGORITHM = [
   "Class Queue:",
   " Initialize items as an empty array []",
   " ",
   " Function enqueue(item):",
   " Append item to the back of items",
   " ",
   " Function dequeue():",
   " If items is empty, Return None",
   " Remove and Return the front item (index 0)",
   " ",
   " Function front():",
   " If items is empty, Return None",
   " Return the front item without removing it",
   " ",
   " Function is_empty():",
   " Return True if items length is 0, else False"
];

export default function QueuePage() {
   const [queue, setQueue] = useState<number[]>([]);
   const [currentLine, setCurrentLine] = useState(-1);
   const [speed, setSpeed] = useState(50);

   const handleEnqueue = (val: number) => {
      setCurrentLine(4);
      setTimeout(() => {
         setCurrentLine(5);
         setQueue(prev => [...prev, val]);
         setTimeout(() => setCurrentLine(-1), (101 - speed) * 5);
      }, (101 - speed) * 5);
   };

   const handleDequeue = () => {
      if (queue.length === 0) return;
      setCurrentLine(8);
      setTimeout(() => {
         setCurrentLine(9);
         setQueue(prev => prev.slice(1));
         setTimeout(() => setCurrentLine(-1), (101 - speed) * 5);
      }, (101 - speed) * 5);
   };

   const handleFront = () => {
      if (queue.length === 0) return;
      setCurrentLine(11);
      setTimeout(() => {
         setCurrentLine(12);
         setTimeout(() => setCurrentLine(-1), 1500);
      }, 500);
   };

   const handleClear = () => {
      setQueue([]);
      setCurrentLine(-1);
   };

   return (
      <main className="min-h-screen pt-24 pb-12 flex flex-col items-center">
         <Navbar />

         <div className="container max-w-7xl flex-1 flex flex-col gap-8 px-6">
            <div className="flex flex-col gap-2">
               <h1 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight text-center md:text-left">
                  Queue <span className="text-accent italic">Visualizer</span>
               </h1>
               <p className="text-muted-foreground text-lg font-semibold tracking-wide border-l-4 border-accent/30 pl-4 py-1 max-w-2xl text-center md:text-left">
                  A FIFO (First-In, First-Out) data structure with Queue operations visualization.
               </p>
            </div>

            <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-6">
               <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
                  <InputPanel onAdd={handleEnqueue} onRemove={handleDequeue} label="Enqueue Value" />

                  <div className="grid grid-cols-2 gap-3 px-1">
                     <PremiumButton className="h-14 px-8 text-base font-black col-span-2 text-sm uppercase tracking-widest" onClick={() => handleEnqueue(Math.floor(Math.random() * 99) + 1)} variant="gradient">
                        <RotateCcw size={14} className="mr-2" /> Enqueue Random Value
                     </PremiumButton>
                     <PremiumButton className="h-14 px-8 text-base font-black" onClick={handleFront} variant="secondary" disabled={queue.length === 0}>
                        <Eye size={16} /> Front
                     </PremiumButton>
                     <PremiumButton className="h-14 px-8 text-base font-black" onClick={handleClear} variant="danger" disabled={queue.length === 0}>
                        <RotateCcw size={16} /> Clear
                     </PremiumButton>
                  </div>


               </div>

               <div className="lg:col-span-8 glass-card min-h-[550px] flex flex-col items-center justify-center p-8 order-1 lg:order-2 relative overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black text-white/[0.03] [.light_&]:!text-black/[0.02] select-none pointer-events-none uppercase">
                     QUEUE
                  </div>

                  <div className="w-full flex items-center justify-center gap-4 p-8 relative">
                     <AnimatePresence mode="popLayout">
                        {queue.map((val, idx) => (
                           <motion.div
                              key={`${idx}-${val}`}
                              layout
                              initial={{ opacity: 0, x: 100, scale: 0.8 }}
                              animate={{ opacity: 1, x: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 50, scale: 0.5, transition: { duration: 0.2 } }}
                              className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 [.light_&]:liquid-node  text-white [.light_&]:!text-black flex items-center justify-center rounded-2xl font-bold shadow-xl border border-white/10  relative group"
                           >
                              <span className="text-xl">{val}</span>

                              {idx === 0 && (
                                 <div className="absolute -top-10 flex flex-col items-center gap-1">
                                    <span className="text-sm font-bold text-emerald-400 uppercase tracking-tighter">FRONT</span>
                                    <div className="w-1 h-2 bg-emerald-500 rounded-full" />
                                 </div>
                              )}

                              {idx === queue.length - 1 && queue.length > 1 && (
                                 <div className="absolute -bottom-10 flex flex-col items-center gap-1">
                                    <div className="w-1 h-2 bg-teal-500 rounded-full" />
                                    <span className="text-sm font-bold text-teal-400 uppercase tracking-tighter">REAR</span>
                                 </div>
                              )}
                           </motion.div>
                        ))}
                     </AnimatePresence>

                     {queue.length === 0 && (
                        <div className="flex flex-col items-center gap-4 text-muted-foreground/40 font-mono">
                           <div className="w-16 h-16 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center">
                              ?
                           </div>
                           <span className="text-xs italic">// QUEUE_EMPTY</span>
                        </div>
                     )}
                  </div>

                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 opacity-20">
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-sm font-bold uppercase">Enqueue End</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-sm font-bold uppercase">Dequeue End</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* New Section for Logic and Code */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 h-auto lg:h-[550px] mb-12">
               <div className="h-[500px] lg:h-full">
                  <LogicBreakdown steps={[
                     { title: 'Enqueue', text: 'Add an item to the rear (end) of the queue. If full, queue overflows.' },
                     { title: 'Dequeue', text: 'Remove an item from the front. The second item becomes the new front.' },
                     { title: 'Front', text: 'View the front item without removing it.' }
                  ]} complexity={'O(1) per operation'} />
               </div>
               <div className="h-[500px] lg:h-full">
                  <CodePanel algorithm={QUEUE_ALGORITHM} currentLine={currentLine} />
               </div>
            </div>
         </div>
      </main>
   );
}
