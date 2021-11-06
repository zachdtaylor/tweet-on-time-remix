import type { LoaderFunction } from "remix";
import { twitterClient2 } from "~/utils/twitter-client";

export let loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  console.log(params);
  twitterClient2
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
  return null;
};

export default function Index() {
  return <div></div>;
}
