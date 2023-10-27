import fetchCharacter, { createCharacter } from "@/data-access/character";
import { AppRouteHandlerFnContext } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, ctx: AppRouteHandlerFnContext) {
  const character = await fetchCharacter(
    Number.parseInt(ctx.params.id as string)
  );
  return NextResponse.json(character);
}
