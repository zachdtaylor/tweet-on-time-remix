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

export let meta: MetaFunction = () => {
  return {
    title: "Sign in - Tweet on Time",
    description: "Schedule your tweets.",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader: LoaderFunction = async () => {
  return {};
};

export let action: ActionFunction = async () => {
  const token = await twitter.getRequestToken();
  if (token.oauth_callback_confirmed === "false") {
    throw Error("could not get oauth token");
  }
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
