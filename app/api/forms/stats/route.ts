import User from "@/models/UsersModel";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
  const {userId} = await req.json();

  const user = await User.findById(userId)
    .populate("forms")

  const totalForms = user.forms.length;

  const latestForm = user.forms[user.forms.length - 1];

  return Response.json({
    totalForms,
    latestForm
  })
}
