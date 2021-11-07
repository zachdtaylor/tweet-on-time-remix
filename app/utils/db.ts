import { PrismaClient } from "@prisma/client";
import type { Prisma, Session, User } from "@prisma/client";

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

export async function updateUserOauthData(userData: Omit<User, "id">) {
  return prisma.user.upsert({
    where: { twitterUserId: userData.twitterUserId },
    update: {
      oauthToken: userData.oauthToken,
      oauthTokenSecret: userData.oauthTokenSecret,
    },
    create: userData,
  });
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
