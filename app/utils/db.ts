import { MongoClient, ObjectID } from "mongodb";

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
  threadLength: number;
}

export async function getAllTweets(): Promise<Tweet[]> {
  const db = await connectToDB();
  const tweets = await db.collection("tweets").find().toArray();
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

export { connectToDB };
