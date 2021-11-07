import { redirect } from "remix";
import { getSession } from "./sessions";
import type { UserSession } from "./sessions";
import type { SignedInUser } from "./db";

export function getRequiredEnvVar(key: string) {
  let value = `${key}-placeholder-value`;
  const envVar = process.env[key];
  if (envVar) {
    value = envVar;
  }
  return value;
}

type ProtectedRouteCallback = ({
  session,
  user,
}: {
  session: UserSession;
  user: SignedInUser;
}) => any;

export async function protectedRoute(
  request: Request,
  callback: ProtectedRouteCallback
) {
  const session = await getSession(request);
  const user = await session.getUser();
  if (!user) {
    return redirect("/sign-in");
  }
  return callback({ session, user });
}
