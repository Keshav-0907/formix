import { connectToDb } from "@/lib/connectToDb";
import FormModel from "@/models/FormModel";
import User from "@/models/UsersModel";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    await connectToDb();

    const user = await User.findOne({ _id: data.owner });

    if (!user) {
      return new Response(
        JSON.stringify({
          message: "User not found",
        }),
        { status: 404 }
      );
    }

    const newForm = new FormModel({
      title: data.title || "Untitled Form",
      description: data.description || "",
      isActive: true,
      theme: data.theme || "light",
      background: data.background || "",
      elements: data.elements || [],
      owner: data.owner,
      responses: data.responses || [],
    });

    const savedForm = await newForm.save();

    // @ts-ignore - Type 'string' is not assignable to type 'ObjectId'
    user.forms = user.forms || [];
    // @ts-ignore - Type 'string' is not assignable to type 'ObjectId'
    user.forms.push(newForm._id);
    await user.save();

    return new Response(
      JSON.stringify({
        message: "Form submitted successfully",
        data: savedForm,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Form submission error:", error);
    return new Response(
      JSON.stringify({
        message: "Form submission failed",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
}
