import { auth } from "@/auth";
import Chart from "@/components/Chart";
import { Event } from "@/lib/models/EventSchema";
import { Page } from "@/lib/models/PageSchema";
import { FaLink } from "react-icons/fa";
import { isToday } from "date-fns";
import mongoose from "mongoose";
import { redirect } from "next/navigation";
import SectionBox from "@/layout/SectionBox";

// Define the Link and Page interfaces
interface Link {
  title: string;
  subtitle?: string;
  url: string;
}

interface PageType {
  uri: string;
  links: Link[];
}

export default async function AnalyticsPage() {
  // Connect to the database
  await mongoose.connect(process.env.MONGODB_URI!);

  // Get the current session
  const session = await auth();
  if (!session) {
    return redirect("/");
  }

  // Fetch the page owned by the session user
  const page: PageType | null = await Page.findOne({
    owner: session.user.providerId,
    ownerProvider: session.user.provider,
  });

  if (!page) {
    return redirect("/account");
  }

  // Aggregate the views
  const groupedViews = await Event.aggregate([
    {
      $match: {
        type: "view",
        uri: page.uri,
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$createdAt",
            format: "%Y-%m-%d",
          },
        },
        count: { $count: {} },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  // Fetch all clicks related to the page
  const clicks = await Event.find({
    page: page.uri,
    type: "click",
  });

  return (
    <div className="flex flex-col gap-4 pt-2">
      <SectionBox>
        <h2 className="text-xl mb-6 text-center">Views</h2>
        <Chart
          data={groupedViews.map((o) => ({
            date: o._id,
            views: o.count,
          }))}
        />
      </SectionBox>
      <SectionBox>
        <h2 className="text-xl mb-6 text-center">Clicks</h2>

        {page.links.length ? (
          page.links.map((link: Link) => (
            <div
              key={link.title}
              className="md:flex gap-4 items-center border-t border-gray-200 py-4"
            >
              <div className="text-blue-500 pl-4">
                <FaLink />
              </div>
              <div className="grow">
                <h3>{link.title || "no title"}</h3>
                <p className="text-gray-700 text-sm">
                  {link.subtitle || "no description"}
                </p>
                <a
                  className="text-xs text-blue-400"
                  target="_blank"
                  href={link.url}
                >
                  {link.url}
                </a>
              </div>
              <div className="text-center">
                <div className="border rounded-md p-2 mt-1 md:mt-0">
                  <div className="text-3xl">
                    {
                      clicks.filter(
                        (c) => c.uri === link.url && isToday(c.createdAt)
                      ).length
                    }
                  </div>
                  <div className="text-gray-400 text-xs uppercase font-bold">
                    clicks today
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="border rounded-md p-2 mt-1 md:mt-0">
                  <div className="text-3xl">
                    {clicks.filter((c) => c.uri === link.url).length}
                  </div>
                  <div className="text-gray-400 text-xs uppercase font-bold">
                    clicks total
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="justify-center items-center flex">No Links Added Yet</div>
        )}
      </SectionBox>
    </div>
  );
}
