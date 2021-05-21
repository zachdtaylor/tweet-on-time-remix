import { NavLink, Outlet } from "react-router-dom";
import type { LoaderFunction } from "remix";
import { useRouteData } from "remix";
import { getAllTweets } from "../../utils/db";
import type { Tweet } from "../../utils/db";

export let loader: LoaderFunction = async () => {
  return await getAllTweets();
};

export default function Index() {
  const data = useRouteData<Tweet[]>();
  return (
    <div className="h-full flex flex-row">
      <div className="flex flex-col flex-none w-1/3">
        <p className="py-2 px-4 border-b border-r border-gray-700">New</p>
        <ul className="h-full border-r border-gray-700 overflow-scroll">
          {data.map((tweet) => (
            <li key={tweet.id} className="py-4 px-4 border-b border-gray-700">
              <NavLink to={tweet.id} activeClassName="bg-gray-700">
                <p className="text-xs pb-1">
                  {tweet.tweetDate} {tweet.tweetTime}
                </p>
                <p className="text-sm">{previewText(tweet.body)}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}

function previewText(body: string) {
  if (body.length <= 50) {
    return body;
  } else {
    return `${body.slice(0, 50)}...`;
  }
}
