"use server";

import { auth } from "@/auth";
import { Link } from "@/components/forms/PageLinksForm";
import { adapter } from "@/lib/adapter";
import { Page } from "@/lib/models/PageSchema";
import mongoose from "mongoose";

// sessionTypes.ts

export async function savePageSettings(
  formData: Record<string, string | null>
): Promise<{ success: boolean; avatarUrl?: string }> {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const session = await auth();

    if (session) {
      console.log(formData);
      // Keys related to page settings
      const pageKeys = [
        "memeName",
        "embedded",
        "memeMoment",
        "bgType",
        "bgColor",
        "bgImage",
        "memeColor",
      ];

      // Build an object to update only the keys present in the formData
      const dataToUpdate: Record<string, string | null> = {};
      for (const key of pageKeys) {
        if (key in formData) {
          dataToUpdate[key] = formData[key];
        }
      }

      // Update the page data
      await Page.updateOne(
        {
          owner: session.user?.providerId,
          ownerProvider: session.user?.provider,
        },
        dataToUpdate
      );

      // Handle avatar updates separately
      let avatarUrl: string | undefined | null; // Allow null as wellF
      if ("avatar" in formData) {
        avatarUrl = formData.avatar;
        const adapterInstance = await adapter();

        const user = adapterInstance.updateUser
          ? await adapterInstance.updateUser({
              id: session.user.id,
              image: avatarUrl,
            })
          : null;

        console.log(user);
      }

      return {
        success: true,
        avatarUrl: avatarUrl ?? undefined, // Return the avatar URL to the frontend
      };
    }

    return { success: false };
  } catch (error) {
    console.error("Error saving page settings:", error);
    return { success: false };
  }
}

export async function savePageButtons(formData: FormData): Promise<boolean> {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const session = await auth();

    if (session) {
      const buttonsValues: Record<string, string> = {};

      formData.forEach((value, key) => {
        if (typeof value === "string") {
          buttonsValues[key] = value;
        }
      });

      const dataToUpdate = { buttons: buttonsValues };

      await Page.updateOne(
        {
          owner: session?.user?.providerId,
          ownerProvider: session?.user?.provider,
        },
        dataToUpdate
      );

      return true;
    }

    return false;
  } catch (error) {
    console.error("Error saving page buttons:", error);
    return false;
  }
}

export async function savePageLinks(
  links: Link[] // Accepts an array of Link objects
): Promise<boolean> {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const session = await auth();

    if (session) {
      await Page.updateOne(
        {
          owner: session?.user?.providerId,
          ownerProvider: session?.user?.provider,
        },
        { links }
      );
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error saving page links:", error);
    return false;
  }
}
