import { PrismaClient } from "@prisma/client";
import type { Prisma } from "@prisma/client";

export async function getAllTweets(query?: string) {
  const prisma = new PrismaClient();
  return prisma.tweet.findMany({
    where: {
      body: {
        contains: query || "",
      },
    },
  });
}

export async function getTweet(id: number) {
  const prisma = new PrismaClient();
  return prisma.tweet.findUnique({
    where: {
      id: id,
    },
  });
}

export async function writeTweet(tweet: Prisma.TweetCreateInput) {
  const prisma = new PrismaClient();
  return prisma.tweet.create({ data: tweet });
}
