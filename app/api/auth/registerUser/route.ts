import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDb } from "@/lib/connectToDb";
import User from "@/models/UsersModel";


export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  
  // Validate input
  if (!name || !email || !password) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  await connectToDb()

  const checkIfUserExisit = await User.find({ email });

  if (checkIfUserExisit.length > 0) {
    return new Response(JSON.stringify({ error: "User already exists" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const hasedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hasedPassword,
  })

  await newUser.save();

  return new Response(JSON.stringify({ name, email, password }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
