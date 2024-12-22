"use client";

import { ReactSortable } from "react-sortablejs";
import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaRedditAlien,
  FaTelegram,
  FaTiktok,
  // FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import {
  FaEnvelope,
  // FaGripLines,
  // FaMobile,
  FaPlus,
  FaSave,
  FaTrash,
} from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import SectionBox from "../../layout/SectionBox";
import SubmitButton from "../SubmitButton";
import DexScreener from "@/assets/images/dexscreenerIcon.png";
import DexTool from "@/assets/images/dextoolIcon.png";
import Phantom from "@/assets/images/phantomIcon.png";
import PumpFun from "@/assets/images/pump.funIcon.png";
import Raydium from "@/assets/images/raydiumIcon.jpg";
import Coingecko from "@/assets/images/coingeckoicon.svg";
import CoinMarket from "@/assets/images/coinmarketcapicon.svg";
import Bitget from "@/assets/images/bidgetIcon.png";
import Bybit from "@/assets/images/bybitIcon.svg";
import Image from "next/image";
import { SiBinance } from "react-icons/si";
import { FaSquareXTwitter } from "react-icons/fa6";
import { savePageButtons } from "@/actions/pageAction";

export const allButtons: Button[] = [
  {
    id: "13",
    key: "pumpfun",
    label: "PumpFun",
    image: PumpFun,
    placeholder: "https://pump.fun/your-profile",
  },
  {
    id: "14",
    key: "raydium",
    label: "Raydium",
    image: Raydium,
    placeholder: "https://raydium.io/",
  },
  {
    id: "19",
    key: "dexscreener",
    label: "DexScreener",
    image: DexScreener,
    placeholder: "https://dexscreener.com/token/...",
  },
  {
    id: "11",
    key: "dextool",
    label: "DexTool",
    image: DexTool,
    placeholder: "https://dextools.io/app/...",
  },
  {
    id: "12",
    key: "phantom",
    label: "Phantom",
    image: Phantom,
    placeholder: "https://phantom.app/",
  },
  {
    id: "20",
    key: "binance",
    label: "Binance",
    icon: SiBinance,
    color: "#F3BA2F",
    placeholder: "https://binance.com/",
  },
  {
    id: "15",
    key: "coingecko",
    label: "CoinGecko",
    image: Coingecko,
    placeholder: "https://coingecko.com/en/coins/...",
  },
  {
    id: "16",
    key: "coinmarketcap",
    label: "CoinMarketCap",
    image: CoinMarket,
    placeholder: "https://coinmarketcap.com/currencies/...",
  },
  {
    id: "17",
    key: "bitget",
    label: "Bitget",
    image: Bitget,
    placeholder: "https://bitget.com/...",
  },
  {
    id: "18",
    key: "bybit",
    label: "Bybit",
    image: Bybit,
    placeholder: "https://bybit.com/...",
  },
  {
    id: "1",
    key: "email",
    label: "e-mail",
    icon: FaEnvelope,
    color: "#EA4335",
    placeholder: "Enter your email address",
  },
  {
    id: "2",
    key: "reddit",
    label: "Reddit",
    icon: FaRedditAlien,
    color: "#FF4500",
    placeholder: "https://reddit.com/u/your-username",
  },
  {
    id: "3",
    key: "instagram",
    label: "Instagram",
    icon: FaInstagram,
    color: "#E1306C",
    placeholder: "https://instagram.com/your-profile",
  },
  {
    id: "4",
    key: "facebook",
    label: "Facebook",
    icon: FaFacebook,
    color: "#1877F2",
    placeholder: "https://facebook.com/your-profile",
  },
  {
    id: "5",
    key: "discord",
    label: "Discord",
    icon: FaDiscord,
    color: "#5865F2",
    placeholder: "https://discord.com/users/your-id",
  },
  {
    id: "6",
    key: "tiktok",
    label: "TikTok",
    icon: FaTiktok,
    color: "#010101",
    placeholder: "https://tiktok.com/@your-username",
  },
  {
    id: "7",
    key: "youtube",
    label: "YouTube",
    icon: FaYoutube,
    color: "#FF0000",
    placeholder: "https://youtube.com/c/your-channel",
  },
  {
    id: "8",
    key: "x",
    label: "X (Twitter)",
    icon: FaSquareXTwitter,
    color: "",
    placeholder: "https://x.com/your-username",
  },
  {
    id: "9",
    key: "github",
    label: "GitHub",
    icon: FaGithub,
    color: "#171515",
    placeholder: "https://github.com/your-username",
  },
  {
    id: "10",
    key: "telegram",
    label: "Telegram",
    icon: FaTelegram,
    color: "#0088CC",
    placeholder: "https://t.me/your-username",
  },
];

type Button = {
  color?: string;
  id: string;
  key: string;
  label: string;
  icon?: React.ElementType; // Keep optional since not all buttons have an icon
  image?: string; // For buttons with images instead of icons
  placeholder?: string;
};

type PageButtonsFormProps = {
  user: unknown; // Replace with appropriate type for 'user'
  page: {
    buttons?: Record<string, string> | null; // Mark buttons as optional or nullable
  };
};

function upperFirst(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PageButtonsForm({ user, page }: PageButtonsFormProps) {
  const pageButtons = page.buttons || {}; // Default to an empty object if buttons is null or undefined
  const pageSavedButtonsKeys = Object.keys(pageButtons); // Safely access keys
  const pageSavedButtonsInfo = pageSavedButtonsKeys.map((k) =>
    allButtons.find((b) => b.key === k)
  );
  const [activeButtons, setActiveButtons] = useState<Button[]>(
    pageSavedButtonsInfo.filter(Boolean) as Button[]
  );

  function addButtonToProfile(button: Button) {
    // console.log(button);
    setActiveButtons((prevButtons) => [...prevButtons, button]);
  }

  async function saveButtons(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Pass FormData directly to the function
    const success = await savePageButtons(formData);

    if (success) {
      toast.success("Settings saved!");
    } else {
      toast.error("Failed to save settings!");
    }
  }

  function removeButton({ key: keyToRemove }: Button) {
    setActiveButtons((prevButtons) =>
      prevButtons.filter((button) => button.key !== keyToRemove)
    );
  }

  const availableButtons = allButtons.filter(
    (b1) => !activeButtons.find((b2) => b1.key === b2.key)
  );

  return (
    <SectionBox>
      <form onSubmit={saveButtons}>
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        <ReactSortable<Button>
          handle=".handle"
          list={activeButtons}
          setList={setActiveButtons}
        >
          {activeButtons.map((b) => (
            <div key={b.key} className="mb-4 md:flex items-center">
              <div className="w-56 flex h-full text-gray-700 p-2 gap-2 items-center">
                {/* Conditional rendering for icon or image */}
                {b.icon ? (
                  <b.icon
                    className="cursor-pointer handle p-2 w-10 h-10"
                    style={{ color: b.color || "inherit" }}
                  />
                ) : b.image ? (
                  <Image
                    src={b.image}
                    alt={b.label}
                    className="cursor-pointer handle p-2 w-10 h-10 object-contain"
                  />
                ) : null}
                <span className="truncate lg:max-w-[150px]">
                  {upperFirst(b.label)}:
                </span>
              </div>
              <div className="grow flex gap-2">
                <input
                  placeholder={b.placeholder}
                  name={b.key}
                  defaultValue={pageButtons[b.key]}
                  type="text"
                  className="w-full border rounded px-2 py-1"
                />
                <button
                  onClick={() => removeButton(b)}
                  type="button"
                  className="py-2 px-4 bg-gray-300 hover:bg-gray-400 transition-colors cursor-pointer rounded-sm"
                  title="Remove Button"
                >
                  <FaTrash className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </ReactSortable>

        <div className="grid grid-cols-3 lg:grid-cols-5 lg:gap-4 gap-2 mt-4 border-y py-4 justify-start items-start">
          {availableButtons.map((b) => (
            <button
              key={b.key}
              type="button"
              onClick={() => addButtonToProfile(b)}
              className="flex items-center justify-center gap-2 p-2 bg-gray-200 rounded-md shrink-0 w-full lg:min-w-[150px]"
            >
              {b.icon ? (
                <b.icon
                  className="w-6 h-6 shrink-0"
                  style={{ color: b.color || "inherit" }}
                />
              ) : b.image ? (
                <Image
                  src={b.image}
                  alt={b.label}
                  className="w-6 h-6 object-contain shrink-0"
                />
              ) : null}
              <span className="truncate lg:max-w-[100px]">
                {upperFirst(b.label)}
              </span>
              <FaPlus className="shrink-0" />
            </button>
          ))}
        </div>

        <div className="max-w-xs mx-auto mt-8">
          <SubmitButton>
            <FaSave />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}
