"use server";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./db";

export async function adapter() {
  return MongoDBAdapter(client);
}
