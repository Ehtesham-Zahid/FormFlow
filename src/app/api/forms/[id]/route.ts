import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import {
  deleteFormById,
  getFormById,
  updateFormById,
} from "@/src/services/form.service";
import { UpdateFormInput } from "@/src/types/form.types";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { userId } = await auth();

    const { id: formId } = await params;

    const form = await getFormById(formId, userId ?? undefined);

    const response = {
      id: form._id,
      title: form.title,
      fields: form.fields,
      status: form.status,
      createdAt: form.createdAt,
      updatedAt: form.updatedAt,
    };

    return NextResponse.json(
      { success: true, data: response },
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

    const body: UpdateFormInput = await req.json();

    const form = await updateFormById(formId, userId, body);

    return NextResponse.json(
      { success: true, message: "Form updated successfully", data: form },
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
