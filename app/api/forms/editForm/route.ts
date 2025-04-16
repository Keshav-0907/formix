import { NextRequest } from "next/server";
import { connectToDb } from "@/lib/connectToDb";
import FormModel from "@/models/FormModel";
import jwt from "jsonwebtoken";

export async function PATCH(req: NextRequest) {
  try {
    await connectToDb();

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded) {
      return new Response(JSON.stringify({ message: "Invalid token" }), { status: 401 });
    }

    const { formId, ...fieldsToUpdate } = await req.json();

    if (!formId) {
      return new Response(JSON.stringify({ message: "Missing formId" }), { status: 400 });
    }

    const updatedForm = await FormModel.findByIdAndUpdate(formId, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    if (!updatedForm) {
      return new Response(JSON.stringify({ message: "Form not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedForm), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
