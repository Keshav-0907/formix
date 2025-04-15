import { NextRequest } from "next/server";
import User from "@/models/UsersModel";

export async function POST(req: NextRequest) {
    const { userId } = await req.json();

    const user = await User.findById(userId).populate("forms");

    if (!user) {
        return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }
    if (!user.forms || user.forms.length === 0) {
        return new Response(JSON.stringify({ message: "No forms found" }), { status: 404 });
    }

    return Response.json({
        forms: user.forms
    }, {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });

}