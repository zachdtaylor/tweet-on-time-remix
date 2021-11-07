import { LinksFunction, LoaderFunction, useLoaderData } from "remix";
import { Meta, Links, Scripts, LiveReload, redirect } from "remix";
import { Outlet } from "react-router-dom";

import tailwindUrl from "./styles/tailwind.css";
import rootStylesUrl from "./styles/root.css";
import { NavBar } from "./components/navbar";
import { getSession } from "./utils/sessions";
import { TwitterData } from "./utils/twitter-client";

export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindUrl },
    { rel: "stylesheet", href: rootStylesUrl },
  ];
};

export let loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);
  const user = await session.getUser();
  return user?.twitterData || null;
};

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}

        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  const data = useLoaderData<TwitterData>();
  console.log(data);
  return (
    <Document>
      {data && <NavBar data={data} />}
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  );
}
