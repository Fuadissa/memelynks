import Tag from "@/components/Tag";

import IntegrationColumn from "@/components/IntegrationColumn";
import xTwitter from "@/assets/images/X_logo000.svg";
import DexScreener from "@/assets/images/dexscreener.png";
import Dextool from "@/assets/images/dextools.jpg";
import PumpFun from "@/assets/images/pumpfun.jpg";
import Radium from "@/assets/images/raydium.webp";
import BullX from "@/assets/images/Bullx.svg";
import Telegram from "@/assets/images/telegram-memeIcon.svg";

const integrations = [
  {
    name: "PumpFun",
    icon: PumpFun,
    description: "PumpFun tracks meme coin launches and pumps.",
  },
  {
    name: "X (Twitter)",
    icon: xTwitter,
    description:
      "X (Twitter) is a social media platform for real-time news and updates.",
  },
  {
    name: "Dextool",
    icon: Dextool,
    description: "Dextool analyzes and tracks meme coin markets.",
  },
  {
    name: "DexScreener",
    icon: DexScreener,
    description: "DexScreener shows real-time meme coin trading data.",
  },
  {
    name: "Telegram",
    icon: Telegram,
    description:
      "Telegram is a fast and secure messaging platform for seamless communication.",
  },
  {
    name: "Radium",
    icon: Radium,
    description: "Radium supports meme coin staking and liquidity.",
  },
  {
    name: "BullX",
    icon: BullX,
    description: "BullX tracks bullish trends in meme coins.",
  },
];

export type IntegrationsType = typeof integrations;

export default function Integrations() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 items-center lg:gap-16">
          <div>
            <Tag>Meme-Coin Links</Tag>

            <h2 className="text-6xl font-medium mt-6">
              One Place for{" "}
              <span className="text-[#ffce7b]">All Your Meme Links</span>
            </h2>

            <p className="text-white/50 mt-4 text-lg">
              Create a single page to showcase all your meme coin’s essential
              links, from social updates to trading data, and make your coin
              stand out.
            </p>
          </div>
          <div>
            <div className="h-[400px] lg:mt-0 lg:h-[800px] grid md:grid-cols-2 gap-4 mt-8 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
              <IntegrationColumn integrations={integrations} />
              <IntegrationColumn
                integrations={integrations.slice().reverse()}
                className="hidden md:flex"
                reverse
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
