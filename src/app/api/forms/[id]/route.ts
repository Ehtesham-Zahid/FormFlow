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
      publishedTitle: form.publishedTitle,
      fields: form.fields,
      publishedFields: form.publishedFields,
      publishedAt: form.publishedAt,
      status: form.status,
      isArchived: form.isArchived,
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
  { params }: { params: Promise<{ id: string }> },
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

    const { id: formId } = await params;

    const body: UpdateFormInput = await req.json();

    const updatedForm = await updateFormById(formId, userId, body);

    const response = {
      id: updatedForm._id,
      title: updatedForm.title,
      publishedTitle: updatedForm.publishedTitle,
      fields: updatedForm.fields,
      publishedFields: updatedForm.publishedFields,
      publishedAt: updatedForm.publishedAt,
      status: updatedForm.status,
      isArchived: updatedForm.isArchived,
      createdAt: updatedForm.createdAt,
      updatedAt: updatedForm.updatedAt,
    };

    return NextResponse.json(
      {
        success: true,
        message: "Form updated successfully",
        data: response,
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

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
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

    const { id: formId } = await params;

    const result = await deleteFormById(formId, userId);

    const response = {
      id: result.id,
    };

    return NextResponse.json(
      {
        success: true,
        message: "Form deleted successfully",
        data: response,
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
