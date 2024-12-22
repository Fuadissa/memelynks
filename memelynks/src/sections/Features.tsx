import FeatureCard from "@/components/FeatureCard";
import Tag from "@/components/Tag";

import Telegram from "@/assets/images/telegram-memeIcon.svg";
import xTwitter from "@/assets/images/X_logo000.svg";
import DexScreener from "@/assets/images/dexscreener.png";
import PumpFun from "@/assets/images/pumpfun.jpg";
import Image from "next/image";
import Avatar from "@/components/Avatar";
import Key from "@/components/Key";

const features = [
  "Centralized Hub for Meme Links",
  "Community Engagement Tools",
  "Customizable Templates",
  "Link Aggregation for Meme Coins",
  "Branding and Themes",
  "Stand-Out From Other Meme's",
];

export default function Features() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="flex justify-center">
          <Tag>Features</Tag>
        </div>

        <h2 className="text-6xl font-medium text-center mt-6 max-w-2xl mx-auto">
          Where power meets <span className="text-[#ffce7b]">simplicity</span>
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 lg:grid-cols-3">
          <FeatureCard
            className="md:col-span-2 lg:col-span-1 group"
            title="Centralized Hub for Meme Links"
            description="Easily organize and share all your meme coin links in one place."
          >
            <div className="aspect-video flex items-center justify-center">
              <Avatar className="z-40 border-green-400">
                <Image src={PumpFun} alt="Avatar 1" className="rounded-full" />
              </Avatar>
              <Avatar className="-ml-6 border-[#fff] z-30">
                <Image
                  src={DexScreener}
                  alt="Avatar 3"
                  className="rounded-full"
                />
              </Avatar>
              <Avatar className="-ml-6 border-white z-20">
                <Image src={xTwitter} alt="Avatar 2" className="rounded-full" />
              </Avatar>
              <Avatar className="-ml-6 border-transparent transition group-hover:border-blue-600">
                <div className="size-full inline-flex relative items-center gap-1 group-hover:bg-white justify-center bg-neutral-700 rounded-full">
                  <Image
                    src={Telegram}
                    alt="Avatar 4"
                    className="absolute size-full rounded-full opacity-0 group-hover:opacity-100 transition"
                  />
                  {Array.from({ length: 3 }).map((_, i) => (
                    <span
                      key={i}
                      className="size-1.5 inline-flex rounded-full bg-white "
                    ></span>
                  ))}
                </div>
              </Avatar>
            </div>
          </FeatureCard>
          <FeatureCard
            className="md:col-span-2 lg:col-span-1 group"
            title="Templates"
            description="Design unique and branded pages with templates crafted for your meme."
          >
            <div className="aspect-video flex items-center justify-center">
              <p className="text-4xl font-extrabold text-white/20 text-center group-hover:text-white/10 transition duration-500">
                Creative <br />
                <span className="relative bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  <span>Designs</span>
                  <video
                    src="/assets/gif-incredible.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute bottom-full left-1/2 -translate-x-1/2 transition duration-500 rounded-2xl shadow-xl opacity-0 pointer-events-none group-hover:opacity-100"
                  />
                </span>
                <br />
                For Your Coin.
              </p>
            </div>
          </FeatureCard>
          <FeatureCard
            className="md:col-span-2 md:col-start-2 group lg:col-span-1 lg:col-start-auto"
            title="Stand Out"
            description="Elevate your meme coin with unique branding tools and customizable features."
          >
            <div className="aspect-video gap-4 flex items-center justify-center">
              <Key className="w-28 outline outline-2 transition-all duration-500 outline-offset-4 outline-transparent group-hover:outline-[#fee2b2] group-hover:translate-y-1">
                Pump
              </Key>
              <Key className="w-28 outline outline-2 transition-all duration-500 outline-offset-4 outline-transparent group-hover:outline-[#fee2b2] group-hover:translate-y-1 delay-150">
                ATH
              </Key>
              <Key className="outline outline-2 transition-all duration-500 outline-offset-4 outline-transparent group-hover:outline-[#fee2b2] group-hover:translate-y-1 delay-300">
                $
              </Key>
            </div>
          </FeatureCard>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {features.map((feature) => (
            <div
              key={feature}
              className="hover:scale-105 transition duration-500 group bg-neutral-900 border border-white/10 inline-flex px-3 py-1.5 md:px-5 md:py-2 rounded-2xl gap-3 items-center"
            >
              <span className="bg-[#ffce7b] text-neutral-950 size-5 rounded-full inline-flex items-center justify-center text-xl group-hover:rotate-45 transition duration-500">
                &#10038;
              </span>
              <span className="font-medium md:text-lg">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
