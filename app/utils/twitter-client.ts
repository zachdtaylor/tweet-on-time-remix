import Twitter from "twitter-lite";

if (typeof process.env.CONSUMER_KEY === "undefined") {
  throw new Error("Environment variable CONSUMER_KEY must be set");
}

if (typeof process.env.CONSUMER_SECRET === "undefined") {
  throw new Error("Environment variable CONSUMER_SECRET must be set");
}

const twitterClient = new Twitter({
  subdomain: "api",
  version: "1.1",
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

export { twitterClient };
