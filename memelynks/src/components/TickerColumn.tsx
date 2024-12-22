"use client";

import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

export default function TickerColumn(props: {
  text: string;
  className?: string;
  reverse?: boolean;
  fontSize?: number; // Accept font size as a prop
  glowColor?: string; // Accept dynamic glow color
}) {
  const { text, className, reverse, fontSize = 5 } = props;

  // Calculate dynamic scroll offset and duration
  const { scrollOffset, duration } = useMemo(() => {
    const baseOffset = 100; // Minimum offset for short text
    const lengthFactor = text.length * 2; // Additional offset based on text length
    const sizeFactor = fontSize * 10; // Additional offset based on font size
    let calculatedOffset = baseOffset + lengthFactor + sizeFactor;

    if (text.length < 11) {
      calculatedOffset = 100;
    }

    const baseDuration = 10; // Minimum duration
    const additionalDuration = text.length * 0.1 + fontSize * 0.2; // Add duration per character and font size
    let calculatedDuration = baseDuration + additionalDuration;

    if (text.length < 11) {
      calculatedDuration = 8;
    }

    return { scrollOffset: calculatedOffset, duration: calculatedDuration };
  }, [text, fontSize]);

  return (
    <div
      className={twMerge("relative h-full w-full overflow-hidden", className)}
    >
      {/* Top and Bottom Gradient Effects */}
      <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      <motion.div
        initial={{ y: reverse ? `${scrollOffset}%` : `-${scrollOffset}%` }} // Start fully off-screen
        animate={{ y: reverse ? `-${scrollOffset}%` : `${scrollOffset}%` }} // Scroll fully off-screen in the opposite direction
        transition={{
          duration: duration, // Dynamic duration
          repeat: Infinity, // Infinite scrolling
          ease: "linear", // Smooth, constant speed
        }}
        className="absolute flex items-center justify-center w-full h-full"
      >
        {/* Rotated Text for Vertical Scrolling */}
        <div className="whitespace-nowrap">
          <h1
            className={`font-bold transform text-${fontSize}xl text-transparent ${
              reverse ? "rotate-90" : "-rotate-90"
            } tracking-wider`}
            style={{
              WebkitTextStroke: `2px ${"white"}`,
            }}
          >
            {text}
          </h1>
        </div>
      </motion.div>
    </div>
  );
}
