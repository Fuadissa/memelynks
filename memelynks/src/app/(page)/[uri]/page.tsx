import TickerColumn from "@/components/TickerColumn";
import Image from "next/image";
import React from "react";
import Navbar from "@/components/Navbar";
import EmbeddedTweet from "@/components/EmbeddedTwitterPost";
import { Page } from "@/lib/models/PageSchema";
import { Event } from "@/lib/models/EventSchema";
import mongoose from "mongoose";
import Link from "next/link";
import { adapter } from "@/lib/adapter";
import ClientSideLink from "@/components/ClientSideLink";
import {
  buttonLink,
  findButtonByKey,
  generateLinearGradient,
  upperFirst,
} from "@/lib/utils";
// import User from "@/lib/models/UserSchema";

type Params = Promise<{ uri: string }>;

type UserPageProps = {
  params: Params;
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
  const uri = (await params).uri;
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
              ? `${upperFirst(page.uri.replace("$", ""))}`
              : `$${upperFirst(page.uri)}`
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
