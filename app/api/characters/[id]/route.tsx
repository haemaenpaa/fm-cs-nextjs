import fetchCharacter from "@/data-access/character";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const character = await fetchCharacter(Number.parseInt(params.id));
  return NextResponse.json(character);
}
