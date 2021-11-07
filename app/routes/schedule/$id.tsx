import React from "react";
import { useLoaderData } from "remix";
import type { LinksFunction, LoaderFunction } from "remix";
import { getTweet } from "../../utils/db";
import stylesUrl from "../../../styles/routes/schedule/$id.css";
import { protectedRoute } from "~/utils/misc";
import { TwitterData } from "~/utils/twitter-client";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader: LoaderFunction = async ({ params, request }) => {
  return protectedRoute(request, async ({ user }) => {
    const tweet = await getTweet(user.id, parseInt(params.id || ""));
    return { user: user.twitterData, tweet };
  });
};

export default function ScheduledTweet() {
  const data = useLoaderData();
  return (
    <div className="w-full">
      <div className="w-full flex flex-row justify-between">
        <h1>Tweet</h1>
        <p className="text-sm text-gray-400">{data.tweet.sendAt}</p>
      </div>
      <div className="mt-4">
        <TweetBox more={false} user={data.user}>
          {data.tweet.body}
        </TweetBox>
      </div>
    </div>
  );
}

type TweetBoxProps = {
  children: React.ReactNode;
  more?: boolean;
  user: TwitterData;
};

function TweetBox({ children, more, user }: TweetBoxProps) {
  return (
    <div className="flex flex-row">
      <div className="flex-none">
        <img
          src={user.profileImage}
          alt="Profile image"
          className="max-h-12 rounded-full"
        />
        {more && <div className="vl h-8 my-3"></div>}
      </div>
      <p className="pl-3">{children}</p>
    </div>
  );
}
