import React from "react";
import {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
  ActionFunction,
  redirect,
} from "remix";
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
  return redirect(".");
};

export default function Index() {
  return (
    <div className="flex flex-col h-full">
      <main className="flex-auto">
        <form>
          <button type="submit">Sign in with Twitter</button>
        </form>
      </main>
    </div>
  );
}
