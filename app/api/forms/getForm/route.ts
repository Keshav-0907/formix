import { NextResponse, NextRequest } from "next/server"
import FormModel from "@/models/FormModel"
import { connectToDb } from "@/lib/connectToDb"

export async function POST(req: NextRequest) {
   const {id} = await req.json()

   await connectToDb()

   const res = await FormModel.findById(id)

    if (!res) {
        return NextResponse.json({message: "Form not found"}, {status: 404})
    }

    return NextResponse.json(res, {status: 200})
}