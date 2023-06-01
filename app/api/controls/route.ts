import { NextResponse } from "next/server"

// TODO: TO DELETE, TEST ONLY
export async function GET(request: Request, context: any) {
  const res = await fetch("https://swapi.dev/api/planets/1", {})
  const data = await res.json()

  return NextResponse.json({ data })
}
