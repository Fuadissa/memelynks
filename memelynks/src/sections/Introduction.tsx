"use client";
import Tag from "@/components/Tag";
import { useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const text = `MemeRoots makes it effortless for meme coins to consolidate their presence, providing a single link to showcase all key platforms and updates.`;

const words = text.split(" ");

export default function Introduction() {
  const scrollTarget = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ["start end", "end end"],
  });

  const [currentWord, setCurrentWord] = useState(0);

  const wordIndex = useTransform(scrollYProgress, [0, 1], [0, words.length]);

  useEffect(() => {
    wordIndex.on("change", (latest) => {
      setCurrentWord(latest);
    });
  }, [wordIndex]);

  return (
    <section className="py-28 lg:py-40">
      <div className="container">
        <div className="sticky top-20 md:top-28 lg:top-40">
          <div className="flex justify-center">
            <Tag>Introducing MemeLynks</Tag>
          </div>
          <div className="text-4xl md:text-6xl lg:text-7xl text-center font-medium mt-10">
            <span>In the fast-paced world of meme coins,</span>{" "}
            <span className="">
              {words.map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className={twMerge(
                    "transition duration-500 text-white/15",
                    wordIndex < currentWord && "text-white"
                  )}
                >{`${word} `}</span>
              ))}
            </span>
            <span className="text-[#ffce7b] block">
              That&apos;s why we built MemeLynks.
            </span>
          </div>
        </div>
        <div className="h-[150vh]" ref={scrollTarget}></div>
      </div>
    </section>
  );
}
