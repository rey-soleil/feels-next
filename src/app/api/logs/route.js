import { NextResponse } from "next/server";

const MongoClient = require("mongodb").MongoClient;
const client = await MongoClient.connect(
  "mongodb+srv://rbarcelo:rJ5NWXwYcruv89Zk@cluster0.js4pllv.mongodb.net/feels?retryWrites=true&w=majority"
);
const db = client.db("feels");

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  console.log(`BE: getting past logs with code ${code}`);

  const logs = db.collection("logs");
  const recentLogs = await logs
    .find({
      createdAt: { $exists: true },
      moods: { $exists: true, $ne: [] },
      activities: { $exists: true, $ne: [] },
      code: { $eq: code },
    })
    .sort({ createdAt: -1 })
    .toArray();
  return NextResponse.json(recentLogs);
}

export async function POST(request) {
  const { moods, activities, code } = await request.json();
  console.log({ moods, activities, code });

  const logs = db.collection("logs");
  logs
    .insertOne({ moods, activities, code, createdAt: new Date() })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.error(error));

  return NextResponse.json({ moods, activities, code });
}
