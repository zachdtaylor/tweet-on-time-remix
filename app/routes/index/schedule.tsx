import {
  NavLink,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { LoaderFunction, LinksFunction, usePendingFormSubmit } from "remix";
import { useRouteData, Form } from "remix";
import { getAllTweets } from "../../utils/db";
import type { Tweet } from "../../utils/db";
import stylesUrl from "../../styles/routes/schedule.css";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader: LoaderFunction = ({ request }) => {
  const search = new URLSearchParams(new URL(request.url).search);
  return getAllTweets(search.get("query"));
};

export default function Schedule() {
  const data = useRouteData<Tweet[]>();
  const location = useLocation();
  const [params] = useSearchParams();
  const pendingForm = usePendingFormSubmit();

  return (
    <div className="h-full flex flex-row">
      <div className="flex flex-col flex-none w-1/4 border-r border-gray-700 p-3">
        <NavLink
          to={{ pathname: "new", search: location.search }}
          activeClassName="bg-twitterblue"
          className="fixed bottom-3 right-3 p-3 rounded-full cursor-pointer bg-twitterblue"
        >
          <WriteIcon />
        </NavLink>
        <Form
          onSubmit={(event) => (!!pendingForm ? event.preventDefault() : null)}
          action={location.pathname}
          className="flex flex-row items-center px-2 py-1"
        >
          <SearchIcon />
          <input
            type="text"
            name="query"
            className="w-full bg-primary ml-2 px-2 py-1 focus:outline-none"
            placeholder="Search tweets..."
            defaultValue={params.get("query") ?? undefined}
          />
        </Form>
        <ul className="h-full overflow-scroll">
          {data.map((tweet) => (
            <li key={tweet.id} className="my-2">
              <NavLink
                to={{ pathname: tweet.id, search: location.search }}
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

function WriteIcon() {
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
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  );
}

function SearchIcon() {
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
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
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
