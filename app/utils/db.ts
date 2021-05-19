import { MongoClient } from "mongodb";

const connectToDB = async () => {
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  });
  await client.connect();
  return client.db("tweet-on-time");
};

export interface Tweet {
  id: string;
  body: string;
  tweetDate: string;
  tweetTime: string;
  thread?: { body: string }[];
}

export async function getAllTweets() {
  const db = await connectToDB();
  const tweets = await db.collection<Tweet>("tweets").find().toArray();
  return tweets;
}

export { connectToDB };
