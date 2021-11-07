import { PrismaClient } from "@prisma/client";
import type { Prisma, Session, User } from "@prisma/client";
import { getTwitterClient, verifyCredentials } from "./twitter-client";
import { Awaited } from "./types";

const prisma = new PrismaClient();

export async function getAllTweets(userId: number, query?: string) {
  return prisma.tweet.findMany({
    where: {
      userId: userId,
      body: {
        contains: query || "",
      },
    },
  });
}

export async function getTweet(userId: number, id: number) {
  return prisma.tweet.findFirst({
    where: {
      id: id,
      userId: userId,
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

export async function getUserFromSessionId(sessionId: number) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });
  if (!session) {
    throw new Error("No user was found");
  }
  const user = session.user;
  const twitterClient = getTwitterClient(user);
  const twitterData = await verifyCredentials(twitterClient);
  if (!twitterData) {
    throw new Error("Twitter credentials could not be verified");
  }
  return {
    ...user,
    twitterData,
  };
}

export type SignedInUser = Awaited<ReturnType<typeof getUserFromSessionId>>;
