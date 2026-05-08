import {
  deleteSubmissionById,
  getSubmissionById,
} from "@/src/services/submission.service";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string; submissionId: string }> },
) {
  try {
    const userId = (await auth()).userId || "dev-user-id";

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id: formId, submissionId } = await params;

    const submission = await getSubmissionById(formId, userId, submissionId);

    const response = {
      id: submission._id.toString(),
      formId: submission.formId,
      answers: submission.answers,
      createdAt: submission.createdAt,
      updatedAt: submission.updatedAt,
    };

    return NextResponse.json({
      success: true,
      message: "Fetched Submission",
      data: response,
    });
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

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string; submissionId: string }> },
) {
  try {
    const userId = (await auth()).userId || "dev-user-id";

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id: formId, submissionId } = await params;

    const result = await deleteSubmissionById(formId, userId, submissionId);

    const response = {
      id: result.id,
    };

    return NextResponse.json({
      success: true,
      message: "Deleted Submission",
      data: response,
    });
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
