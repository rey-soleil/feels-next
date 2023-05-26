import { NextResponse } from "next/server";

const MongoClient = require("mongodb").MongoClient;
const client = await MongoClient.connect(process.env.MONGODB_URL);
const db = client.db("feels");

export async function GET(request) {
  // get the mood from the request
  // TODO: figure out a Next.js native way of doing this
  const backslashIndex = request.url.lastIndexOf("/");
  const questionMarkIndex = request.url.lastIndexOf("?");
  const mood = request.url.substring(backslashIndex + 1, questionMarkIndex);
  console.log({ mood });

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  console.log({ code });

  const logs = db.collection("logs");
  const logsForMood = await logs
    .find({
      createdAt: { $exists: true },
      moods: { $exists: true, $ne: [], $in: [mood] },
      activities: { $exists: true, $ne: [] },
      code: { $eq: code },
    })
    .sort({ createdAt: -1 })
    .toArray();
  return NextResponse.json(logsForMood);
}
