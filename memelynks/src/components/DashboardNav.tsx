"use client";

import AppSidebar from "@/layout/AppSidebar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaLink } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { Session } from "next-auth"; // Import the correct session type
import { AnimatePresence, motion } from "framer-motion";

interface PageSettingsFormProps {
  page: {
    bgType: string;
    bgColor: string;
    bgImage: string;
    memeName: string;
    embedded: string;
    memeMoment: string;
    uri: string;
  };
  session: Session; // Use the correct session type
}

export const DashboardNav = ({ page, session }: PageSettingsFormProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="h-[100%] m-1 rounded-md bg-neutral-950 grid grid-cols-3 gap-3 justify-between items-center px-[0.21rem] col-span-12">
        <div className="pl-2 md:hidden lg:hidden">
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
            className="feather feather-menu md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <line
              x1="3"
              y1="6"
              x2="21"
              y2="6"
              className={twMerge(
                "origin-left transition",
                isOpen && "rotate-45 -translate-y-1"
              )}
            ></line>
            <line
              x1="3"
              y1="12"
              x2="21"
              y2="12"
              className={twMerge("transition", isOpen && "opacity-0")}
            ></line>
            <line
              x1="3"
              y1="18"
              x2="21"
              y2="18"
              className={twMerge(
                "origin-left transition",
                isOpen && "-rotate-45 translate-y-1"
              )}
            ></line>
          </svg>
        </div>
        <div className="text-white px-3 text-xl lg:text-3xl">
          Meme<span className="text-[#ffce7b]">Lynks</span>
        </div>
        <div className="rounded-md text-2xl md:flex lg:flex justify-center items-center text-white hidden">
          {page ? `$${page.uri.toUpperCase()}` : "$TICKER"}
        </div>
        <div className="flex justify-end items-center h-[90%]">
          <Link
            href={"/" + page.uri}
            target="_blank"
            className="lg:px-16 px-8 flex justify-center items-center bg-[#ffce7b] rounded-sm h-full text-xl cursor-pointer"
          >
            View
          </Link>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }} // Starts fully off-screen to the left
            animate={{ x: "0%" }} // Slides into view
            exit={{ x: "-100%" }} // Slides out to the left
            transition={{ duration: 0.5, ease: "easeInOut" }} // Controls the speed and easing
            className="fixed top-[4.65rem] left-[0.25rem] h-[90vh] w-[70%] bg-neutral-950 rounded-md p-4 overflow-hidden z-50"
          >
            <aside>
              <div className="top-0 pt-2">
                <div className="flex justify-start items-center gap-3 text-white">
                  <div className="rounded-full overflow-hidden aspect-square w-12">
                    <Image
                      src={session.user?.image || "/default-avatar.png"}
                      width={256}
                      height={256}
                      alt="avatar"
                    />
                  </div>
                  <div>{session?.user?.name}</div>
                </div>
                {page && (
                  <Link
                    target="_blank"
                    href={"/" + page.uri}
                    className="text-center mt-4 flex gap-1 items-center justify-center"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <FaLink className="text-[#ffce7b] font-l text-lg" />
                    <span className="text-xl text-gray-300">/</span>
                    <span className="text-white underline">${page.uri}</span>
                  </Link>
                )}
                <div className="text-center">
                  <AppSidebar />
                </div>
              </div>
            </aside>
          </motion.div>
        )}
      </AnimatePresence>

      <aside
        className={`bg-neutral-950 lg:col-span-2 md:col-span-3 hidden md:block p-2 pt-6 shadow fixed md:static -left-48 top-0 bottom-0 z-20 transition-all m-1 mt-0 rounded-md`}
      >
        <div className="sticky top-0 pt-2">
          <div className="flex justify-start items-center gap-3 text-white">
            <div className="rounded-full overflow-hidden aspect-square w-12">
              <Image
                src={session.user?.image || "/default-avatar.png"}
                width={256}
                height={256}
                alt="avatar"
              />
            </div>
            <div>{session?.user?.name}</div>
          </div>
          {page && (
            <Link
              target="_blank"
              href={"/" + page.uri}
              className="text-center mt-4 flex gap-1 items-center justify-center"
            >
              <FaLink className="text-[#ffce7b] font-l text-lg" />
              <span className="text-xl text-gray-300">/</span>
              <span className="text-white underline">${page.uri}</span>
            </Link>
          )}
          <div className="text-center">
            <AppSidebar />
          </div>
        </div>
      </aside>
    </>
  );
};
