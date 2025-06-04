import User from "@/models/UsersModel";
import { NextRequest } from "next/server";
import { connectToDb } from "@/lib/connectToDb";
import FormModel from "@/models/FormModel";

export async function POST(req: NextRequest) {
  try {
    const {userId} = await req.json();
      
    await connectToDb();

    const user = await User.findById(userId)

    const forms = await FormModel.find({ owner: userId });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const totalForms = forms.length;
    const latestForm = forms[forms.length - 1];

    return Response.json({
      totalForms,
      latestForm
    });
  } catch (error) {
    console.error("Stats error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
