import { MongoClient } from "mongodb";

const connectToDB = async () => {
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  });
  await client.connect();
  return client.db("tweet-on-time");
};

export { connectToDB };
