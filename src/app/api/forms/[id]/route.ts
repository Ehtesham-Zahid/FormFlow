import { getFormById } from "@/src/services/form.service";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { userId } = await auth();

    const formId = params.id;

    const form = await getFormById(formId, userId ?? undefined);

    return NextResponse.json({ success: true, data: form }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      {
        status: error.statusCode || 500,
      },
    );
  }
}
