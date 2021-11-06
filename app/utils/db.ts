import { PrismaClient } from "@prisma/client";
import type { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllTweets(query?: string) {
  return prisma.tweet.findMany({
    where: {
      body: {
        contains: query || "",
      },
    },
  });
}

export async function getTweet(id: number) {
  return prisma.tweet.findUnique({
    where: {
      id: id,
    },
  });
}

export async function writeTweet(tweet: Prisma.TweetCreateInput) {
  return prisma.tweet.create({ data: tweet });
}
