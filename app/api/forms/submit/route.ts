import { NextRequest, NextResponse } from "next/server";
import ResponseModel from "@/models/ResponseModel";
import { connectToDb } from "@/lib/connectToDb";
import FormModel from "@/models/FormModel";

export async function POST(req: NextRequest) {
  await connectToDb();

  try {
    const { formId, responses } = await req.json();

    if (!formId || !Array.isArray(responses)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const form = await FormModel.findById(formId);
    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    const newResponse = await ResponseModel.create({
      formId,
      responses, // expected to be array of { elementId, response }
    });

    //@ts-ignore -- TBF
    form.responses.push(newResponse._id);
    await form.save();

    

    return NextResponse.json(
      { message: "Response submitted successfully", data: newResponse },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error submitting response:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
