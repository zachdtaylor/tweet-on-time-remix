import {
  NavLink,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { LoaderFunction, LinksFunction, usePendingFormSubmit } from "remix";
import { useRouteData, Form } from "remix";
import { getAllTweets } from "../../utils/db";
import type { ScheduledTweet } from "../../utils/db";
import stylesUrl from "../../styles/routes/schedule.css";
import { LoadingTweetShimmer, WriteIcon } from "../../components";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

function sleep(ms: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

export let loader: LoaderFunction = async ({ request }) => {
  // await sleep(3000);
  const search = new URLSearchParams(new URL(request.url).search);
  return getAllTweets(search.get("query") ?? undefined);
};

export default function Schedule() {
  const data = useRouteData<ScheduledTweet[]>();
  const location = useLocation();
  const [params] = useSearchParams();
  const pendingForm = usePendingFormSubmit();
  const pending = !!pendingForm;

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
          onSubmit={(event) => (pending ? event.preventDefault() : null)}
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
          {pending ? (
            <>
              <li>
                <LoadingTweetShimmer />
              </li>
              <li>
                <LoadingTweetShimmer />
              </li>
              <li>
                <LoadingTweetShimmer />
              </li>
            </>
          ) : data.length === 0 ? (
            <li className="my-4 text-gray-400">
              <p className="m-auto w-min whitespace-nowrap">No Tweets</p>
            </li>
          ) : (
            data.map((tweet) => (
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
            ))
          )}
        </ul>
      </div>
      <div className="w-full p-4">
        <Outlet />
      </div>
    </div>
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
