import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api.deezer.com";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const resolved = await params;
  const path = resolved.path?.join("/") ?? "";
  const search = request.nextUrl.search;
  const target = `${BASE_URL}/${path}${search}`;

  try {
    const response = await fetch(target, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch data from Deezer API" },
      { status: 502 },
    );
  }
}
