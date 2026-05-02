import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { deleteFormById, getFormById } from "@/src/services/form.service";

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

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const formId = params.id;
  } catch (error) {}
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const formId = params.id;

    const result = await deleteFormById(formId, userId);

    return NextResponse.json(
      {
        success: true,
        message: "Form deleted successfully",
        data: result,
      },
      { status: 200 },
    );
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
