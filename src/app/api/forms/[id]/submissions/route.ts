import { createSubmission } from "@/src/services/submission.service";
import { SubmissionDocument } from "@/src/types/submission.types";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: formId } = await params;

    const body = await req.json();

    const submission: SubmissionDocument = await createSubmission(formId, body);

    const response = {
      id: submission._id,
      formId: submission.formId,
      answers: submission.answers,
      createdAt: submission.createdAt,
      updatedAt: submission.updatedAt,
    };

    return NextResponse.json(
      {
        success: true,
        message: "Submission Successful",
        data: response,
      },
      { status: 201 },
    );
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
