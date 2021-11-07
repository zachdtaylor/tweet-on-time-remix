import React from "react";
import { useLoaderData, redirect } from "remix";
import type { LinksFunction, LoaderFunction } from "remix";
import { useTwitterUser } from "../../context/twitter-user";
import { getTweet } from "../../utils/db";
import stylesUrl from "../../../styles/routes/schedule/$id.css";
import { getSession } from "~/utils/sessions";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader: LoaderFunction = async ({ params, request }) => {
  const session = await getSession(request);
  const user = await session.getUser();
  if (!user) {
    return redirect("/sign-in");
  }
  return getTweet(user.id, parseInt(params.id || ""));
};

export default function ScheduledTweet() {
  const data = useLoaderData();
  return (
    <div className="w-full">
      <div className="w-full flex flex-row justify-between">
        <h1>Tweet</h1>
        <p className="text-sm text-gray-400">
          {data.tweetDate} at {data.tweetTime}
        </p>
      </div>
      <div className="mt-4">
        <TweetBox more={data.threadLength > 1}>{data.body}</TweetBox>
      </div>
    </div>
  );
}

type TweetBoxProps = {
  children: React.ReactNode;
  more?: boolean;
};

function TweetBox({ children, more }: TweetBoxProps) {
  const user = useTwitterUser();
  return (
    <div className="flex flex-row">
      <div className="flex-none">
        <img
          src={user?.profileImage}
          alt="Profile image"
          className="max-h-12 rounded-full"
        />
        {more && <div className="vl h-8 my-3"></div>}
      </div>
      <p className="pl-3">{children}</p>
    </div>
  );
}
