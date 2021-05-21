import { LoaderFunction, useRouteData } from "remix";
import type { Tweet } from "../../../utils/db";
import { getTweet } from "../../../utils/db";

export let loader: LoaderFunction = ({ params }) => {
  return getTweet(params.id);
};

export default function ScheduledTweet() {
  const data = useRouteData<Tweet>();
  return <div>{data.body}</div>;
}
