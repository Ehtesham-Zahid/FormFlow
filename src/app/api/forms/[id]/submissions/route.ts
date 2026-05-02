import { createSubmission } from "@/src/services/submission.service";
import { SubmissionDocument } from "@/src/types/submission.types";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const formId = params.id;

    const body = await req.json();

    const submission: SubmissionDocument = await createSubmission(formId, body);

    return NextResponse.json(
      {
        success: true,
        message: "Submission Successful",
        data: submission,
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
