import {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
  ActionFunction,
  redirect,
  Form,
} from "remix";
import * as twitter from "../utils/twitter-client";
import stylesUrl from "../styles/routes/index.css";
import { getSession } from "~/utils/sessions";

export let meta: MetaFunction = () => {
  return {
    title: "Sign in - Tweet on Time",
    description: "Schedule your tweets.",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

function comingFromAuthenticate(request: Request) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const token = params.get("oauth_token");
  const verifier = params.get("oauth_verifier");
  return token !== null && verifier !== null;
}

// Situations:
//   1. Coming directly, authenticated
//   2. Coming from authentication callback
//   3. Coming directly, un-authenticated
export let loader: LoaderFunction = async ({ request }) => {
  // Case 1 - coming directly, authenticated
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("userId")) {
    return redirect("/");
  }

  // Case 2 - coming from authentication callback
  if (comingFromAuthenticate(request)) {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    console.log(params);
    twitter.twitterClient2
      .getAccessToken({
        oauth_token: params.get("oauth_token") || "",
        oauth_verifier: params.get("oauth_verifier") || "",
      })
      .then((res) => {
        console.log(res);
        console.log({
          accTkn: res.oauth_token,
          accTknSecret: res.oauth_token_secret,
          userId: res.user_id,
          screenName: res.screen_name,
        });
      });
  }

  // Case 3 - coming directly, un-authenticated
  return null;
};

export let action: ActionFunction = async () => {
  const token = await twitter.getRequestToken();
  return redirect(
    `https://api.twitter.com/oauth/authenticate?oauth_token=${token.oauth_token}`
  );
};

export default function Index() {
  return (
    <main className="h-full relative">
      <Form method="post" className="absolute top-1/4 w-full">
        <div className="w-11/12 md:w-1/3 m-auto bg-gray-700 p-5 rounded-md">
          <h1 className="text-center text-2xl mb-5">Tweet on Time</h1>
          <button type="submit" className="w-full">
            <img src="/sign-in-with-twitter-gray.png" className="m-auto" />
          </button>
        </div>
      </Form>
    </main>
  );
}
