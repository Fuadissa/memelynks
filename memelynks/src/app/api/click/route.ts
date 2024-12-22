import { Event } from "@/lib/models/EventSchema";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await mongoose.connect(process.env.MONGODB_URI!);
  const url = new URL(req.url);
  const clickedLink = atob(url.searchParams.get("url") || "");
  const page = url.searchParams.get("page");

  await Event.create({
    type: "click",
    uri: clickedLink,
    page,
  });

  return Response.json({ sucess: true });
}
