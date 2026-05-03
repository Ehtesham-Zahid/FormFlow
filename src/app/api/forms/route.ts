import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { createForm, getUserForms } from "@/src/services/form.service";

export async function POST(req: Request) {
  try {
    const userId = (await auth()).userId || "dev-user-id";

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const form = await createForm(userId);

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: form._id,
          title: form.title,
          fields: form.fields,
          status: form.status,
          createdAt: form.createdAt,
        },
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

export async function GET(req: Request) {
  try {
    const userId = (await auth()).userId || "dev-user-id";

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const forms = await getUserForms(userId);

    return NextResponse.json({ success: true, data: forms }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internat Server Error",
      },
      { status: error.statusCode || 500 },
    );
  }
}
