import updateAbility from "@/data-access/ability";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string; key: string } }
) {
  const promise = request
    .blob()
    .then((b) => b.text())
    .then(Number.parseInt)
    .then((val) => updateAbility(Number.parseInt(params.id), params.key, val))
    .then((res) => res.json());
  return NextResponse.json(promise);
}
