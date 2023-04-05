import { NextResponse } from "next/server";

const MongoClient = require("mongodb").MongoClient;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  console.log(`BE: getting past logs with code ${code}`);

  const client = await MongoClient.connect(
    "mongodb+srv://rbarcelo:rJ5NWXwYcruv89Zk@cluster0.js4pllv.mongodb.net/feels?retryWrites=true&w=majority"
  );
  console.log("Connected to database", client);
  const db = client.db("feels");
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
  console.log({ recentLogs });
  return NextResponse.json(recentLogs);
}
