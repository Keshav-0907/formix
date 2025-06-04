import { NextRequest } from "next/server";
import mongoose from "mongoose";
import User from "@/models/UsersModel";
import { connectToDb } from "@/lib/connectToDb";

interface FormType {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  theme: string;
  views: number;
}

interface PopulatedUser {
  forms: FormType[];
}

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  await connectToDb();

  const user = await User.findById(userId).populate({
    path: "forms",
    options: { sort: { createdAt: -1 }, limit: 5 },
  }) as unknown as PopulatedUser | null;

  
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
  }

  if (!user.forms || user.forms.length === 0) {
    return new Response(JSON.stringify({ message: "No forms found" }), { status: 404 });
  }

  try {
    const recentForms = user.forms.map((form) => ({
      _id: form._id,
      title: form.title,
      description: form.description,
      createdAt: form.createdAt,
      updatedAt: form.updatedAt,
      isActive: form.isActive,
      theme: form.theme,
      views: form.views,
    }));

    return Response.json(
      { forms: recentForms },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error fetching recent forms" }), { status: 500 });
  }
}
