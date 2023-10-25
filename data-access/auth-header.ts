import { getAccessToken } from "@auth0/nextjs-auth0";

export async function authorizationHeaders(): Promise<HeadersInit> {
  const { accessToken } = await getAccessToken({});
  return {
    Authorization: `Bearer ${accessToken}`,
  };
}
