import { createCookieSessionStorage } from "@remix-run/server-runtime";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__tweet_on_time_session",

      // all of these are optional
      // domain: "remix.run",
      // expires: new Date(Date.now() + 60),
      // httpOnly: true,
      // maxAge: 60,
      // path: "/",
      // sameSite: "lax",
      // secrets: ["s3cret1"],
      // secure: true,
    },
  });

export { getSession, commitSession, destroySession };
