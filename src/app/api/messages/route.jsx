import { NextResponse } from "next/server";
import { createMessage, getMessagesByUserId } from "@/queries/messages"; // Импортируем функцию для получения сообщений
import { dbConnect } from "@/lib/mongo";

export const POST = async (request) => {
    try {
        const { text, sender, userId } = await request.json(); // Include userId

        console.log("Received data:", { text, sender, userId });

        await dbConnect();

        const newMessage = {
            text,
            sender,
            userId
        };

        console.log("Message to be saved:", newMessage);

        const savedMessage = await createMessage(newMessage);
        console.log("Saved Message:", savedMessage);

        return new NextResponse("Message has been created", {
            status: 201,
        });
    } catch (error) {
        console.error("Error creating message:", error);
        return new NextResponse(error.message, {
            status: 500,
        });
    }
};

export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return new NextResponse("User ID is required", {
                status: 400,
            });
        }

        await dbConnect();

        const messages = await getMessagesByUserId(userId);
        return new NextResponse(JSON.stringify(messages), {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return new NextResponse(error.message, {
            status: 500,
        });
    }
};