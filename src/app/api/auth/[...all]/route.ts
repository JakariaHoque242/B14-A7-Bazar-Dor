import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handler = toNextJsHandler(auth);

export const GET = async (req: NextRequest) => {
  try {
    return await handler.GET(req);
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Internal Server Error", stack: e?.stack },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    return await handler.POST(req);
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Internal Server Error", stack: e?.stack },
      { status: 500 }
    );
  }
};
