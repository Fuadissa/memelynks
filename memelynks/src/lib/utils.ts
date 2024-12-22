import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  FaDiscord,
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaRedditAlien,
  FaTelegramPlane,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { SiBinance } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import PumpFun from "@/assets/images/pumpfun.jpg";
import Raydium from "@/assets/images/raydium.webp";
import DexScreener from "@/assets/images/dexscreener.png";
import DexTool from "@/assets/images/dextools.jpg";
import Phantom from "@/assets/images/phantomIcon.png";
import Coingecko from "@/assets/images/coingeckoicon.svg";
import CoinMarket from "@/assets/images/coinmarketcapicon.svg";
import Bitget from "@/assets/images/bidgetIcon.png";
import Bybit from "@/assets/images/bybitIcon.svg";

type Button = {
  color?: string;
  id: string;
  key: string;
  label: string;
  icon?: React.ElementType;
  image?: string;
  placeholder?: string;
};

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
    icon: FaXTwitter,
    color: "#000000",
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
    icon: FaTelegramPlane,
    color: "#0088CC",
    placeholder: "https://t.me/your-username",
  },
];

export const buttonLink = (key: string, value: string): string => {
  if (key === "mobile") return `tel:${value}`;
  if (key === "email") return `mailto:${value}`;
  return value;
};

export const generateLinearGradient = (color: string): string => {
  const lightenColor = (hex: string, percent: number): string => {
    const num = parseInt(hex.slice(1), 16);
    const r = Math.min(255, Math.floor((num >> 16) * (1 + percent / 100)));
    const g = Math.min(
      255,
      Math.floor(((num >> 8) & 0x00ff) * (1 + percent / 100))
    );
    const b = Math.min(255, Math.floor((num & 0x0000ff) * (1 + percent / 100)));
    return `rgb(${r}, ${g}, ${b})`;
  };

  const lighter = lightenColor(color, 30);
  const darker = lightenColor(color, -20);

  return `linear-gradient(135deg, ${lighter}, ${color}, ${darker})`;
};

export const findButtonByKey = (key: string): Button | undefined => {
  return allButtons.find((button) => button.key === key) || undefined;
};

export const upperFirst = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
