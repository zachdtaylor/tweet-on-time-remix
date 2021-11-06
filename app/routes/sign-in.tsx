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
    <div className="flex flex-col h-full">
      <main className="flex-auto">
        <Form method="post">
          <button type="submit">Sign in with Twitter</button>
        </Form>
      </main>
    </div>
  );
}
