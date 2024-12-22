import mongoose from "mongoose";
import { Lato } from "next/font/google";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { auth } from "@/auth";
import "../globals.css";
import { Page } from "@/lib/models/PageSchema";
import { DashboardNav } from "@/components/DashboardNav";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Dashboard",
  description: "Your Dashboard Page",
};

type Props = {
  children: React.ReactNode;
};

export default async function AppTemplate({ children }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const headersList = headers();
  const session = await auth();
  if (!session) {
    redirect("/");
    return null; // Ensures the function doesn't proceed further
  }

  //   console.log(session);

  mongoose.connect(process.env.MONGODB_URI as string);

  const page = await Page.findOne({
    owner: session.user?.providerId,
    ownerProvider: session.user?.provider,
  });

  return (
    <html lang="en">
      <body className={lato.className}>
        <Toaster />

        <main className="grid grid-cols-12 min-h-screen grid-rows-[4rem_auto] gap-y-3">
          {/* Mobile navigation toggle */}
          {/* Sidebar */}

          <DashboardNav page={page} session={session} />

          {/* Main content */}
          <div className="grow m-1 rounded-md mt-0 bg-neutral-100 col-span-12 lg:col-span-10 md:col-span-9">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
