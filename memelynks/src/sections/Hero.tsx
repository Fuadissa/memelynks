/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Button from "@/components/Button";
// import designExample1Image from "@/assets/images/design-example-1.png";
// import designExample2Image from "@/assets/images/design-example-2.png";
// import Image from "next/image";
// import Pointer from "@/components/Pointer";
// import { motion, useAnimate } from "framer-motion";
// import { useEffect } from "react";
import cursorYouImage from "@/assets/images/cursor-you.svg";
import { useRouter } from "next/navigation";

export default function Hero() {
  const navigate = useRouter();
  // const [leftDesignScope, leftDesignAnimate] = useAnimate();
  // const [leftPointerScope, leftPointerAnimate] = useAnimate();
  // const [rightDesignScope, rightDesignAnimate] = useAnimate();
  // const [rightPointerScope, rightPointerAnimate] = useAnimate();

  // useEffect(() => {
  //   leftDesignAnimate([
  //     [leftDesignScope.current, { opacity: 1 }, { duration: 0.5 }],
  //     [leftDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }],
  //   ]);
  //   leftPointerAnimate([
  //     [leftPointerScope.current, { opacity: 1 }, { duration: 0.5 }],
  //     [leftPointerScope.current, { y: 0, x: -100 }, { duration: 0.5 }],
  //     [
  //       leftPointerScope.current,
  //       { x: 0, y: [0, 16, 0] },
  //       { duration: 0.5, ease: "easeInOut" },
  //     ],
  //   ]);

  //   rightDesignAnimate([
  //     [rightDesignScope.current, { opacity: 1 }, { duration: 0.5, delay: 1.5 }],
  //     [rightDesignScope.current, { x: 0, y: 0 }, { duration: 0.5 }],
  //   ]);

  //   rightPointerAnimate([
  //     [
  //       rightPointerScope.current,
  //       { opacity: 1 },
  //       { duration: 0.5, delay: 1.5 },
  //     ],
  //     [rightPointerScope.current, { x: 175, y: 0 }, { duration: 0.5 }],
  //     [rightPointerScope.current, { x: 0, y: [0, 20, 0] }, { duration: 0.5 }],
  //   ]);
  // }, []);

  return (
    <section
      className="py-24 overflow-x-clip"
      style={{
        cursor: `url(${cursorYouImage.src}), auto`,
      }}
    >
      <div className="container relative">
        {/* <motion.div
          ref={leftDesignScope}
          initial={{ opacity: 0, y: 100, x: -100 }}
          drag
          className="absolute -left-32 top-16 hidden lg:block"
        >
          <Image
            src={designExample1Image}
            draggable="false"
            alt="design example 1"
          />
        </motion.div>

        <motion.div
          ref={leftPointerScope}
          initial={{ opacity: 0, y: 100, x: -200 }}
          className="absolute left-56 top-96 hidden lg:block"
        >
          <Pointer name="Doge" />
        </motion.div>

        <motion.div
          ref={rightDesignScope}
          drag
          initial={{ opacity: 0, x: 100, y: 100 }}
          className="absolute -right-64 -top-16 hidden lg:block"
        >
          <Image
            src={designExample2Image}
            draggable="false"
            alt="design example 2"
          />
        </motion.div>

        <motion.div
          ref={rightPointerScope}
          initial={{ opacity: 0, x: 275, y: 100 }}
          className="absolute right-80 -top-4 hidden lg:block"
        >
          <Pointer name="Chillguy" color="red" />
        </motion.div> */}

        <div className="flex justify-center">
          <div className="inline-flex py-1 px-3 bg-gradient-to-r from-orange-600 to-[#fee2b2] rounded-full text-neutral-950 font-semibold">
            ✨ Simplify Your Meme Coin Links - MemeRoots
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl font-medium text-center mt-6 lg:text-7xl">
          Everything About Your Ticker, All In One Place.
        </h1>
        <p className="text-center text-xl text-white/50 mt-8 max-w-2xl mx-auto">
          MemeLynks gives your meme coin the visibility it deserves. Easily
          consolidate all your social and trading platforms into one powerful
          link.
        </p>
        <form className="flex border mx-auto border-white/15 rounded-full p-2 max-w-lg mt-8 ">
          <input
            type="text"
            placeholder="memelynks/YourCoinTicker"
            className="bg-transparent px-4 md:flex-1 w-full"
          />
          <Button
            type="submit"
            variant="primary"
            className="whitespace-nowrap"
            size="sm"
            onClick={() => navigate.push("/account")}
          >
            Claim Now
          </Button>
        </form>
      </div>
    </section>
  );
}
