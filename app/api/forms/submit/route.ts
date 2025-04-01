import { NextRequest, NextResponse } from "next/server";
import ResponseModel from "@/models/ResponseModel";
import { connectToDb } from "@/lib/connectToDb";

export async function POST(req: NextRequest) {
  await connectToDb();

  try {
    const { formId, responses } = await req.json();

    if (!formId || !Array.isArray(responses)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const newResponse = await ResponseModel.create({
      formId,
      responses, // expected to be array of { elementId, response }
    });

    return NextResponse.json(
      { message: "Response submitted successfully", data: newResponse },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error submitting response:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
