import { NextResponse } from "next/server";

export interface FetchError extends Error {
  status: number;
  statusText: string;
  message: string;
}

export async function jsonOrError(res: Response) {
  console.log(`Response from ${res.url} ${res.status}: ${res.statusText}`);
  if (res.status === 200) {
    return res.json();
  }
  return Promise.reject({
    status: res.status,
    statusText: res.statusText,
    message: await res.blob().then((b) => b.text()),
  });
}

export async function blankOrError(res: Response): Promise<string> {
  console.log(`Response from ${res.url} ${res.status}: ${res.statusText}`);
  if (res.status === 200) {
    return "";
  }
  return Promise.reject({
    status: res.status,
    statusText: res.statusText,
    message: await res.blob().then((b) => b.text()),
  });
}

export function handleFetchError(err: FetchError): NextResponse {
  return NextResponse.json(err.message, {
    status: err.status,
    statusText: err.statusText,
  });
}
