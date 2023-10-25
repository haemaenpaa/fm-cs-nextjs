import fetchCurrentUser from "@/data-access/user";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export const GET = withApiAuthRequired(async function userGet(
  req: NextRequest
) {
  return NextResponse.json(fetchCurrentUser());
});
