import mongoose from "mongoose";
import { redirect } from "next/navigation";
import cloneDeep from "clone-deep";
import { Page } from "@/lib/models/PageSchema";
import { auth } from "@/auth";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import UsernameForm from "@/components/forms/UsernameForm";

interface AccountPageProps {
  searchParams?: {
    desiredUsername?: string;
  };
}

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const session = await auth();


  if (!session) {
    redirect("/");
    return null;
  }

  const desiredUsername = searchParams?.desiredUsername;

  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const page = await Page.findOne({
      owner: session.user.providerId,
      ownerProvider: session.user.provider,
    });

    if (page) {
      const leanPage = cloneDeep(page.toJSON());
      leanPage._id = leanPage._id.toString();

      return (
        <div className="user-account">
          <PageSettingsForm
            page={leanPage}
            user={{ ...session.user, image: session.user.image ?? undefined }} // Convert null to undefined
          />
          <PageButtonsForm page={leanPage} user={session.user} />
          <PageLinksForm page={leanPage} user={session.user} />
        </div>
      );
    }
  } catch (error) {
    console.error("Error fetching page:", error);
  }

  return (
    <div className="bg-neutral-100 rounded-md h-full flex justify-center items-center">
      <UsernameForm desiredUsername={desiredUsername} />
    </div>
  );
}
