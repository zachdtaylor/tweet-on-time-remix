import type { User } from "@prisma/client";

import { createCookieSessionStorage } from "remix";
import { createSession, getUserFromSessionId } from "~/utils/db";
import { getRequiredEnvVar } from "./misc";
import { Awaited } from "./types";

const sessionIdKey = "__session_id_key__";

const sessionStorage = createCookieSessionStorage({
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

const { commitSession, destroySession } = sessionStorage;

async function getSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const getSessionId = () => session.get(sessionIdKey) as number | undefined;
  const unsetSessionId = () => session.unset(sessionIdKey);
  const commit = () => sessionStorage.commitSession(session);
  return {
    session,
    getSessionId,
    commit,
    getUser: async () => {
      const sessionId = getSessionId();
      if (!sessionId) return null;

      return getUserFromSessionId(sessionId).catch((error) => {
        unsetSessionId();
        console.error(`Failure getting user from session ID:`, error);
        return null;
      });
    },
    signIn: async (user: User) => {
      const userSession = await createSession({ userId: user.id });
      session.set(sessionIdKey, userSession.id);
    },
  };
}

export type UserSession = Awaited<ReturnType<typeof getSession>>;

export { getSession, commitSession, destroySession };
