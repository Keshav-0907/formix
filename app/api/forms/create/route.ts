import { connectToDb } from "@/lib/connectToDb";
import FormModel from "@/models/FormModel";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    await connectToDb();

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
