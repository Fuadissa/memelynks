import TickerColumn from "@/components/TickerColumn";
import Image from "next/image";
import React from "react";
import Navbar from "@/components/Navbar";
import EmbeddedTweet from "@/components/EmbeddedTwitterPost";
import { Page } from "@/lib/models/PageSchema";
import { Event } from "@/lib/models/EventSchema";
import mongoose from "mongoose";
import Link from "next/link";
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
import { adapter } from "@/lib/adapter";
import ClientSideLink from "@/components/ClientSideLink";
// import User from "@/lib/models/UserSchema";

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

const upperFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const findButtonByKey = (key: string): Button | undefined => {
  return allButtons.find((button) => button.key === key) || undefined;
};

type UserPageProps = {
  params: { uri: string };
};

type Link = {
  id: string;
  key: string;
  title: string;
  subtitle: string;
  icon: string;
  url: string;
};

export default async function UserPage({ params }: UserPageProps) {
  const uri = params.uri;
  await mongoose.connect(process.env.MONGODB_URI || "");
  const page = await Page.findOne({ uri });

  if (!page) return <div>Page not found</div>;

  const adapterInstance = await adapter();

  const user = adapterInstance.getUserByAccount
    ? await adapterInstance.getUserByAccount({
        provider: page.ownerProvider,
        providerAccountId: page.owner,
      })
    : null;
  await Event.create({ uri, page: uri, type: "view" });

  return (
    <div
      className="grid lg:grid-cols-6 grid-cols-1 md:grid-cols-1"
      style={{ background: generateLinearGradient(page.memeColor) }}
    >
      <div className="sticky top-0 h-screen hidden lg:block md:hidden">
        <TickerColumn
          text={
            page.uri.startsWith("$")
              ? upperFirst(page.uri)
              : upperFirst(`$${page.uri}`)
          }
          fontSize={7}
          glowColor={page.memeColor}
        />
      </div>

      <div className="lg:col-span-4 w-full overflow-x-hidden">
        <Navbar page={page} />
        <div className="bg-gray-900 flex flex-col items-center pb-6 min-h-screen">
          <div className="relative w-full">
            <div
              className="relative w-full lg:h-48 h-40 md:h-48"
              style={
                page.bgType === "color"
                  ? { backgroundColor: page.bgColor }
                  : {
                      backgroundImage: `url(${page.bgImage})`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }
              }
            ></div>

            <div className="relative lg:-mt-16 md:-mt-16 -mt-11 lg:left-10 md:left-10 left-8">
              <div className="lg:w-32 lg:h-32 md:w-32 md:h-32 h-24 w-24 border-4 border-gray-900 rounded-full overflow-hidden">
                <Image
                  src={user?.image || ""}
                  alt="Profile Picture"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <h2 className="text-white text-xl lg:text-3xl md:text-3xl">
            {page.memeName}
          </h2>

          {Object.keys(page.buttons).map((buttonKey) => (
            <Link
              key={buttonKey}
              href={`https://${buttonLink(buttonKey, page.buttons[buttonKey])
                .replace("https://", "")
                .replace("http://", "")
                .replace("www.", "")}`}
              target="_blank"
              className="mt-6 w-full px-5 lg:px-52 md:px-48 flex flex-col gap-3"
            >
              <div
                className="text-center text-white p-[0.2rem] rounded-full"
                style={{ background: generateLinearGradient(page.memeColor) }}
              >
                <div className="w-full p-1 grid grid-cols-4 gap-4 rounded-full bg-gray-800 text-white shadow-md hover:bg-gray-700 transition">
                  <div
                    className="w-14 h-14 rounded-full flex justify-center items-center"
                    style={{
                      background: `${
                        findButtonByKey(buttonKey)?.color ||
                        generateLinearGradient(page.memeColor)
                      } `,
                    }}
                  >
                    <div className="w-full relative h-full rounded-full overflow-hidden flex justify-center items-center">
                      {findButtonByKey(buttonKey)?.image && (
                        <Image
                          src={findButtonByKey(buttonKey)?.image || ""}
                          alt="icon"
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      )}

                      {findButtonByKey(buttonKey)?.icon &&
                        React.createElement(
                          findButtonByKey(buttonKey)?.icon as React.ElementType,
                          {
                            className: "w-8 h-8 text-white",
                          }
                        )}
                    </div>
                  </div>
                  <div className="text-xl font-medium col-span-2 w-full flex items-center justify-center">
                    {upperFirst(buttonKey)}
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {page.links.map((link: Link) => (
            <ClientSideLink key={link.url} link={link} page={page} />
          ))}
        </div>
        <div className="bg-white/90 pb-6 w-full flex flex-col items-center">
          <h2 className="pt-4 text-3xl">Meme Moment</h2>
          <div className="grid lg:grid-cols-2 gap-0 md:gap-4 lg:gap-4 p-4 lg:p-6 grid-cols-1 md:grid-cols-2">
            <div className="">
              <EmbeddedTweet tweetUrl={page.embedded} theme="dark" />
            </div>
            <div className="py-8 flex flex-col justify-start items-center">
              <span className="text-lg">{page.memeMoment}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Third Sticky Column */}
      <div className="sticky top-0 h-screen hidden md:hidden lg:block">
        <TickerColumn text={page.memeName} reverse fontSize={7} />
      </div>
    </div>
  );
}
