import { createCookieSessionStorage } from "remix";
import { getRequiredEnvVar } from "./misc";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "tweet_on_time_session",
      secrets: [getRequiredEnvVar("SESSION_SECRET")],

      // all of these are optional
      // domain: "remix.run",
      // expires: new Date(Date.now() + 60),
      // httpOnly: true,
      // maxAge: 60,
      // path: "/",
      // sameSite: "lax",
      // secure: true,
    },
  });

export { getSession, commitSession, destroySession };
