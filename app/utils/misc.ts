import { redirect } from "remix";
import Cryptr from "cryptr";
import { getSession } from "./sessions";
import type { UserSession } from "./sessions";
import type { SignedInUser } from "./db";

let encryptionKey = "dev_encryption_key";

if (process.env.NODE_ENV === "production") {
  const productionKey = process.env.ENCRYPTION_KEY;
  if (productionKey === undefined) {
    throw new Error("Environment variable ENCRYPTION_KEY is undefined");
  }
  encryptionKey = productionKey;
}

const cryptr = new Cryptr(encryptionKey);

export function encryptValue(value: string) {
  return cryptr.encrypt(value);
}

export function decryptValue(value: string) {
  return cryptr.decrypt(value);
}

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
