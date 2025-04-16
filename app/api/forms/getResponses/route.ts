import { NextRequest } from "next/server";
import ResponseModel from "@/models/ResponseModel";
import FormModel from "@/models/FormModel";

export async function POST(req: NextRequest) {
    const { formId, owner } = await req.json();

    if (!formId || !owner) {
        return new Response(JSON.stringify({ message: "Missing Fields" }), {
            status: 400,
        });
    }

    const form = await FormModel.findOne({ _id: formId, owner });

    if (!form) {
        return new Response(
            JSON.stringify({
                message: "Form not found",
                headers: [],
                responses: [],
            }),
            { status: 200 }
        );
    }

    const headers = form.elements
        .filter((element: any) => element.type === "input" || element.type === "textarea")
        .map((element: any) => ({
            id: element.id,
            header: element.data.heading,
        }));

    const responses = await ResponseModel.find({ formId });

    if (!responses || responses.length === 0) {
        return Response.json({
            _id: form._id,
            message: "No responses found",
            responses: [],
            title: form.title,
            description: form.description,
            isActive: form.isActive,
            owner: form.owner,
            theme: form.theme,
        })
    }

    const formattedResponses = responses.map((res: any) => {
        const responseData = headers.map((header: any) => {
            const matching = res.responses.find((r: any) => r.elementId === header.id);
            return {
                id: header.id,
                response: matching?.response || "",
            };
        });

        return {
            _id: res._id,
            createdAt: res.createdAt,
            response: responseData,
        };
    });

    return Response.json({

        message: "Success",
        owner: form.owner,
        theme: form.theme,
        elements: form.elements,
        headers,
        responses: formattedResponses,
        title: form.title,
        description: form.description,
        isActive: form.isActive,
    }, {
        status: 200,
    })
}
