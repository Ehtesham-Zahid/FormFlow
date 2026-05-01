import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { createForm } from "@/src/services/form.service";
import { CreateFormInput } from "@/src/types/form.types";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body: CreateFormInput = await req.json();

    const form = await createForm(body, userId);

    return NextResponse.json({ success: true, data: form }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      { status: error.statusCode || 500 },
    );
  }
}
