import { NavLink, Outlet } from "react-router-dom";
import type { LoaderFunction, LinksFunction } from "remix";
import { useRouteData } from "remix";
import { getAllTweets } from "../../utils/db";
import type { Tweet } from "../../utils/db";
import stylesUrl from "../../styles/routes/schedule.css";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader: LoaderFunction = async () => {
  return await getAllTweets();
};

export default function Index() {
  const data = useRouteData<Tweet[]>();
  return (
    <div className="h-full flex flex-row">
      <div className="flex flex-col flex-none w-1/4 border-r border-gray-700 p-3">
        <NavLink
          to="new"
          activeClassName="bg-twitterblue"
          className="flex flex-row items-center py-2 px-4 menu-item cursor-pointer"
        >
          <PlusIcon />
          <p className="pl-2">New</p>
        </NavLink>
        <ul className="h-full overflow-scroll">
          {data.map((tweet) => (
            <li key={tweet.id} className="my-2">
              <NavLink
                to={tweet.id}
                className="inline-block menu-item py-3 px-4"
                activeClassName="bg-twitterblue"
              >
                <p className="text-xs pb-1">
                  {tweet.tweetDate} {tweet.tweetTime}
                </p>
                <p className="text-sm">{previewText(tweet.body)}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full p-4">
        <Outlet />
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  );
}

function previewText(body: string) {
  if (body.length <= 50) {
    return body;
  } else {
    return `${body.slice(0, 50)}...`;
  }
}
