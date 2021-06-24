import { MongoClient, ObjectID } from "mongodb";

export async function connectToDB() {
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  });
  await client.connect();
  return client.db("tweet-on-time");
}

export type UnsavedTweet = {
  body: string;
  tweetDate: string;
  tweetTime: string;
  thread?: { body: string }[];
};

export type Tweet = UnsavedTweet & {
  id: string;
  threadLength: number;
};

export async function getAllTweets(query?: string): Promise<Tweet[]> {
  const dbQuery = query ? { body: new RegExp(query, "i") } : {};
  const db = await connectToDB();
  const tweets = await db.collection("tweets").find(dbQuery).toArray();
  return tweets.map(sanitizeTweet);
}

export async function getTweet(id: string): Promise<Tweet> {
  const db = await connectToDB();
  const tweet = await db
    .collection("tweets")
    .findOne({ _id: new ObjectID(id) });
  return sanitizeTweet(tweet);
}

function sanitizeTweet({ _id, ...rest }: any): Tweet {
  return {
    id: _id,
    threadLength: rest.thread ? rest.thread.length + 1 : 1,
    ...rest,
  };
}

export async function writeTweet(tweet: UnsavedTweet) {
  const db = await connectToDB();
  const { insertedId } = await db.collection("tweets").insertOne(tweet);
  return insertedId;
}
