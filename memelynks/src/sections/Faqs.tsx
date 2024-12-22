"use client";

import Tag from "@/components/Tag";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const faqs = [
  {
    question: "What is MemeLynks?",
    answer:
      "MemeLynks is a link-in-bio tool designed specifically for meme coins, allowing projects to consolidate all their important links in one place without the need of a website.",
  },
  {
    question: "Why do meme coins need a link-in-bio tool?",
    answer:
      "Meme coins often have a variety of platforms for trading, staking, and social media updates. MemeLynks makes it easy to showcase all those links in a single, shareable location.",
  },
  {
    question: "What makes MemeLynks better than other link-in-bio tools?",
    answer:
      "MemeLynks is tailored for meme coins, with features like trading data integration, pump alerts, and staking links, making it ideal for crypto projects.",
  },
  {
    question: "How can I drive more traffic to my MemeLynks profile?",
    answer:
      "Share your MemeLynks link across all your social media platforms, include it in community channels, and feature it in your marketing campaigns.",
  },
  {
    question: "How many links can I add to my MemeLynks page?",
    answer:
      "You can add as many links as you need, including links to exchanges, social media, staking platforms, and other important resources.",
  },
  {
    question: "Do I need a website for my meme coin to use MemeLynks?",
    answer:
      "No, you don’t need a website. MemeLynks provides a complete, shareable page for all your coin’s links, making it a great alternative to a website.",
  },
  {
    question: "Can I customize my MemeLynks page?",
    answer:
      "Yes, MemeLynks allows you to customize your page with branding, colors, and a unique style to represent your meme coin.",
  },
  // {
  //   question: "Is MemeLynks free to use?",
  //   answer:
  //     "MemeLynks offers both free and premium plans. The free plan includes basic features, while premium plans unlock advanced tools like analytics and custom domains.",
  // },
  // {
  //   question: "How secure is MemeLynks?",
  //   answer:
  //     "MemeLynks takes security seriously. All your data is encrypted, and we ensure your links are safe and reliable for your audience.",
  // },
  // {
  //   question: "Can I see analytics for my MemeLynks page?",
  //   answer:
  //     "Yes, premium users can access detailed analytics to track clicks, traffic sources, and engagement for their links.",
  // },
];

export default function Faqs() {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <section className="py-24">
      <div className="container">
        <div className="flex justify-center">
          {" "}
          <Tag>Faqs</Tag>
        </div>

        <h2 className="text-6xl font-medium mt-6 text-center max-w-xl mx-auto">
          Questions? We&apos;ve got{" "}
          <span className="text-[#ffce7b]">answers</span>
        </h2>
        <div className="mt-12 flex flex-col gap-6 max-w-xl mx-auto">
          {faqs.map((faq, faqIndex) => (
            <div
              key={faq.question}
              className="bg-neutral-900 rounded-2xl border border-white/10 p-6"
            >
              <div
                className="flex justify-between items-center"
                onClick={() =>
                  selectedIndex === faqIndex
                    ? setSelectedIndex(-1)
                    : setSelectedIndex(faqIndex)
                }
              >
                <h3 className="font-medium">{faq.question}</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={twMerge(
                    "flex-shrink-0 feather feather-plus transition duration-300 text-[#ffce7b]",
                    selectedIndex === faqIndex && "rotate-45"
                  )}
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
              <AnimatePresence>
                {selectedIndex === faqIndex && (
                  <motion.div
                    className={twMerge("overflow-hidden")}
                    initial={{
                      height: 0,
                      marginTop: 0,
                    }}
                    animate={{
                      height: "auto",
                      marginTop: 24,
                    }}
                    exit={{ height: 0, marginTop: 0 }}
                  >
                    <p className="text-white/50">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
