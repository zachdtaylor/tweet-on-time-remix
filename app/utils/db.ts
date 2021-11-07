import { PrismaClient } from "@prisma/client";
import type { Prisma, Session } from "@prisma/client";

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

const sessionExpirationTime = 1000 * 60 * 60 * 24 * 365;

export async function getOrCreateUser(twitterUserId: string) {
  let user = await prisma.user.findUnique({
    where: { twitterUserId: twitterUserId },
  });
  if (user) {
    return user;
  }
  return prisma.user.create({ data: { twitterUserId } });
}

export async function createSession(
  sessionData: Omit<Session, "id" | "expirationDate" | "createdAt">
) {
  return prisma.session.create({
    data: {
      ...sessionData,
      expirationDate: new Date(Date.now() + sessionExpirationTime),
    },
  });
}
