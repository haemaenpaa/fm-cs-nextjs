import updateAbility from "@/data-access/ability";
import { handleFetchError } from "@/data-access/fetch-error";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string; key: string } }
) {
  console.log(`Set ${params.key} on char ${params.id}`);
  return request
    .blob()
    .then((b) => b.text())
    .then(Number.parseInt)
    .then((val) => updateAbility(Number.parseInt(params.id), params.key, val))
    .then(NextResponse.json, handleFetchError);
}
