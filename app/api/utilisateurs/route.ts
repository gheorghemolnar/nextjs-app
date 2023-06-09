import { NextResponse } from "next/server";

import { USER } from "@/types/schema";
import { IResponseRO } from "@/lib/services/clientSoap";
import { createUser, getUsers } from "@/app/actions/utilisateurs";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("🚀 DEBUG > POST > body:", body);

  let result = await createUser(body);

  return NextResponse.json(result);
}

export async function GET() {
  let result = await getUsers();

  return NextResponse.json(result);
}
