"use server";

import mongoose from "mongoose";
import { auth } from "@/auth";
import { Page } from "@/lib/models/PageSchema";

interface PageResponse {
  id: mongoose.Types.ObjectId;
  uri: string;
  owner: string;
  ownerProvider: string;
}

export default async function grabTicker({
  ticker,
}: {
  ticker: string;
}): Promise<{ success: boolean; message: string; page?: PageResponse }> {
  if (!ticker) {
    return { success: false, message: "Ticker is required." };
  }

  await mongoose.connect(process.env.MONGODB_URI!);

  const existingPageDoc = await Page.findOne({ uri: ticker });

  if (existingPageDoc) {
    return { success: false, message: "Ticker already exists." };
  }

  const session = await auth();

  if (!session?.user?.providerId) {
    return { success: false, message: "User session is not available." };
  }

  try {
    const newPage = await Page.create({
      uri: ticker,
      owner: session.user.providerId,
      ownerProvider: session.user.provider,
      userId: session.user.id,
    });

    console.log(newPage);

    return {
      success: true,
      message: "Ticker created successfully.",
      page: {
        id: newPage._id.toString(),
        uri: newPage.uri,
        owner: newPage.owner,
        ownerProvider: newPage.ownerProvider,
      },
    };
  } catch (error) {
    console.error('Error creating ticker:', error);
    return { success: false, message: "Error creating ticker.", page: undefined };
  }
}
