import { createCharacter } from "@/data-access/character";
import {
  withApiAuthRequired,
  AppRouteHandlerFnContext,
  AppRouteHandlerFn,
} from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export const POST = withApiAuthRequired(async function POST(
  request: NextRequest,
  ctx: AppRouteHandlerFnContext
) {
  const character = await request.json();
  const created = await createCharacter(character);
  return NextResponse.json(created);
} as AppRouteHandlerFn);
