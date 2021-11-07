import { Outlet } from "react-router-dom";
import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import * as twitter from "../utils/twitter-client";
import stylesUrl from "../styles/routes/index.css";

export let meta: MetaFunction = () => {
  return {
    title: "Tweet on Time",
    description: "Schedule your tweets.",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader: LoaderFunction = async () => {
  const user = await twitter.getUser();
  return {
    user,
  };
};

export default function Index() {
  return (
    <div className="flex flex-col h-full">
      <main className="flex-auto">
        <Outlet />
      </main>
    </div>
  );
}
