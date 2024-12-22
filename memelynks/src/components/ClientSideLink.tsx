// components/Link.tsx
"use client";

import Image from "next/image";
import { FaLink } from "react-icons/fa";
import { generateLinearGradient } from "@/app/(page)/[uri]/page";

type LinkProps = {
  link: {
    url: string;
    title: string;
    subtitle: string;
    icon: string;
  };
  page: {
    uri: string;
    memeColor: string;
  };
};

const handleLinkClick = async (
  link: { url: string },
  page: { uri: string }
) => {
  const apiUrl = `/api/click?url=${btoa(link.url)}&page=${page.uri}`;

  try {
    // Send the ping to your API before navigating
    const result = await fetch(apiUrl, {
      method: "POST",
    });

    if (result.ok) {
      window.open(
        `https://${link.url
          .replace("https://", "")
          .replace("http://", "")
          .replace("www.", "")}`,
        "_blank"
      );
    }
    // Optionally, you can handle the navigation manually after sending the request
  } catch (error) {
    console.error("Error sending ping:", error);
    window.open(
      `https://${link.url
        .replace("https://", "")
        .replace("http://", "")
        .replace("www.", "")}`,
      "_blank"
    );
  }
};

const ClientSideLink = ({ link, page }: LinkProps) => {
  return (
    <a
      href={`https://${link.url
        .replace("https://", "")
        .replace("http://", "")
        .replace("www.", "")}`}
      target="_blank"
      className="mt-6 w-full px-5 lg:px-52 md:px-48 flex flex-col gap-3"
      onClick={(e) => {
        e.preventDefault();
        handleLinkClick(link, page);
      }}
    >
      <div
        className="text-center text-white p-[0.2rem] rounded-full"
        style={{ background: generateLinearGradient(page.memeColor) }}
      >
        <div className="w-full p-1 grid grid-cols-4 gap-4 rounded-full bg-gray-800 text-white shadow-md hover:bg-gray-700 transition">
          <div
            className="w-14 h-14 rounded-full flex justify-center items-center"
            style={{
              background: generateLinearGradient(page.memeColor),
            }}
          >
            <div className="w-full relative h-full rounded-full overflow-hidden flex justify-center items-center">
              {link.icon ? (
                <Image
                  src={link.icon}
                  alt="icon"
                  fill
                  className="object-cover"
                />
              ) : (
                <FaLink className="w-8 h-8 text-white" />
              )}
            </div>
          </div>
          <div className="text-xl font-medium col-span-2 w-full flex items-center justify-center">
            {link.title}
          </div>
        </div>
      </div>
    </a>
  );
};

export default ClientSideLink;
