"use client";

import { allButtons, buttonLink } from "@/app/(page)/[uri]/page";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({
  page,
}: {
  page: { buttons?: Record<string, string> | null };
}) {
  //   const router = usePathname();

  // Prioritized buttons
  const prioritizedKeys = ["x", "telegram", "pumpfun", "dexscreener"];
  const pageButtons = page.buttons || {};

  // Get the available prioritized buttons
  const prioritizedButtons = allButtons.filter(
    (btn) => prioritizedKeys.includes(btn.key) && pageButtons[btn.key]
  );

  // Get the remaining buttons (to supplement up to 5 total)
  const otherButtons = allButtons.filter(
    (btn) => !prioritizedKeys.includes(btn.key) && pageButtons[btn.key]
  );

  // Combine prioritized and other buttons, up to 5 total
  const buttonsToShow = [...prioritizedButtons, ...otherButtons].slice(0, 5);

  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 p-1 bg-black/30 backdrop-blur-lg rounded-full z-50">
      {buttonsToShow.map((button) => (
        <Link
          key={button.key}
          href={buttonLink(button.key, pageButtons[button.key])}
          className="flex items-center justify-center w-12 h-12 rounded-full"
          style={{
            backgroundColor: button.color || "white", // Use button color or fallback to red
          }}
        >
          {button.icon ? (
            // Render icon if available
            <button.icon
              className="w-6 h-6"
              style={{
                color: `white`, // Ensure icon color contrasts the background
              }}
            />
          ) : button.image ? (
            // Render image if available
            <div className="w-12 h-12 rounded-full relative overflow-hidden">
              <Image
                src={button.image}
                alt={button.label}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            // Fallback to label if no icon or image
            <span className="text-white text-sm">{button.label}</span>
          )}
        </Link>
      ))}
    </nav>
  );
}
