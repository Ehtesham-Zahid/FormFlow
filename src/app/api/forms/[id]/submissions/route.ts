import {
  createSubmission,
  getSubmissionsByFormId,
} from "@/src/services/submission.service";
import { SubmissionDocument } from "@/src/types/submission.types";
import { auth } from "@clerk/nextjs/server";
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
      id: submission._id.toString(),
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

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id: formId } = await params;

    const submissions = await getSubmissionsByFormId(formId, userId);

    const response = submissions.map((s) => {
      return {
        id: s._id.toString(),
        formId: s.formId,
        answers: s.answers,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
      };
    });

    return NextResponse.json({
      success: true,
      message: "Fetched All Submissions By Form ID",
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
