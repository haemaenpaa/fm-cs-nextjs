import { AccessTokenError, getAccessToken } from "@auth0/nextjs-auth0";

export async function authorizationHeaders(): Promise<HeadersInit> {
  return new Promise<HeadersInit>(async (res, rej) => {
    const accessTokenPromise = getAccessToken({ scopes: ["openid"] }).catch(
      (e) => {
        rej(e);
        return { accessToken: undefined };
      }
    );
    const { accessToken } = await accessTokenPromise;
    if (accessToken) {
      res({
        Authorization: `Bearer ${accessToken}`,
      });
    }
  });
}
