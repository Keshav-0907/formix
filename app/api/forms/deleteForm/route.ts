import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDb } from "@/lib/connectToDb";
import User from "@/models/UsersModel";
import FormModel from "@/models/FormModel";
import mongoose from "mongoose";

export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    await connectToDb();

    const user = await User.findById(decoded.id);
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const url = new URL(req.url);
    const formId = url.searchParams.get("formId");

    if (!formId || !mongoose.Types.ObjectId.isValid(formId)) {
      return new Response(JSON.stringify({ error: "Invalid or missing formId" }), { status: 400 });
    }

    const form = await FormModel.findById(formId);
    if (!form) {
      return new Response(JSON.stringify({ error: "Form not found" }), { status: 404 });
    }

    if (form.owner.toString() !== user._id.toString()) {
      return new Response(JSON.stringify({ error: "Unauthorized: Not the form owner" }), { status: 403 });
    }

    await FormModel.findByIdAndDelete(formId);

    return new Response(JSON.stringify({ message: "Form deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Delete form error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
