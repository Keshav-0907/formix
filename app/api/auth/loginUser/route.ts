import { connectToDb } from "@/lib/connectToDb";
import { NextRequest } from "next/server";
import User from "@/models/UsersModel";
import bcrypt, { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    await connectToDb()

    const user = await User.findOne({ email });

    if (!user) {
        return new Response(JSON.stringify({ message: "User not found" }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
   
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return new Response(JSON.stringify({ message: "Invalid password" }), {
            status: 401,    
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    })

    const userData = user.toObject();
    delete userData.password; 
    delete userData.__v; 

    return Response.json({
        message: "User found",
        token
    }, {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    })

}