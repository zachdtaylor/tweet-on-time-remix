import Twitter from "twitter-lite";

if (typeof process.env.CONSUMER_KEY === "undefined") {
  throw new Error("Environment variable CONSUMER_KEY must be set");
}

if (typeof process.env.CONSUMER_SECRET === "undefined") {
  throw new Error("Environment variable CONSUMER_SECRET must be set");
}

export const twitterClient = new Twitter({
  subdomain: "api",
  version: "1.1",
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

export interface TwitterUser {
  name: string;
  screenName: string;
  profileImage: string;
  description: string;
}

export async function getUser() {
  const result = await twitterClient.get("account/verify_credentials");
  return {
    name: result.name,
    screenName: result.screen_name,
    profileImage: result.profile_image_url_https.replace("normal", "400x400"),
    description: result.description,
  };
}

export async function getUserTimeline(options: { screen_name: string }) {
  return twitterClient.get("statuses/user_timeline", options);
}

export const twitterClient2 = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
});

export async function getRequestToken() {
  return twitterClient2.getRequestToken("http://localhost:3000").then((res) => {
    console.log(res);
    return res;
  });
}
