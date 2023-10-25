import { convertUserDto } from "@/model/mapper/user-mapper";
import User from "@/model/user";
import { getSession } from "@auth0/nextjs-auth0";
import { authorizationHeaders } from "./auth-header";

export default async function fetchCurrentUser(): Promise<User | undefined> {
  const session = await getSession().catch((error) =>
    console.warn("Failed to get session", error)
  );
  if (!session) {
    return undefined;
  }
  return fetch(process.env.BACKEND_URL + `/user`, {
    headers: await authorizationHeaders(),
    next: { tags: [session?.user.sub] },
  })
    .then(
      (res) => {
        if (res.status != 200) {
          return undefined;
        }
        return res.json();
      },
      (err) => {
        console.error(err);
        return null;
      }
    )
    .then(convertUserDto);
}
