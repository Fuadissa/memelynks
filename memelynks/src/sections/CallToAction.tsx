"use client";

import { AnimationPlaybackControls, motion, useAnimate } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CallToAction() {
  const navigate = useRouter();
  const animation = useRef<AnimationPlaybackControls | null>(null);
  const [scope, animate] = useAnimate();
  const [isHoVered, setIsHovered] = useState(false);

  useEffect(() => {
    animation.current = animate(
      scope.current,
      { x: "-50%" },
      { duration: 30, ease: "linear", repeat: Infinity }
    );
  }, []);

  useEffect(() => {
    if (animation.current) {
      if (isHoVered) {
        animation.current.speed = 0.5;
      } else {
        animation.current.speed = 1;
      }
    }
  }, []);
  return (
    <section className="py-24">
      <div className="overflow-x-clip p-4 flex">
        <motion.div
          ref={scope}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex flex-none gap-16 pr-16 text-7xl md:text-8xl font-medium group cursor-pointer"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-16"
              onClick={() => navigate.push("/account")}
            >
              <span className="text-[#ffce7b] text-7xl">&#10038;</span>
              <span className="group-hover:text-[#ffce7b]">
                Try it for free
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
