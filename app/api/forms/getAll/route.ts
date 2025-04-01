import { connectToDb } from "@/lib/connectToDb";
import FormModel from "@/models/FormModel";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { owner } = body;
       
        if (!owner) {
            return new Response("Missing 'owner' in request body", { status: 400 });
        }

        await connectToDb();

        const forms = await FormModel.find({ owner })


        return new Response(JSON.stringify(forms), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching forms:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch forms" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
