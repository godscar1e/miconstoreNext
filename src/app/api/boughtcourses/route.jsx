import { NextResponse } from "next/server";
import { createCourse } from "@/queries/boughtcourses";
import { dbConnect } from "@/lib/mongo";

export const POST = async (request) => {
    try {
        const { userId, course, pack, price } = await request.json();

        if (!userId) {
            return new NextResponse("User ID is required", {
                status: 400,
            });
        }

        await dbConnect();

        const newCourse = {
            userId,
            course,
            pack,
            price
        };
        console.log(newCourse);
        console.log("New course to be saved:", newCourse);
        const savedCourse = await createCourse(newCourse);
        console.log("New course to be saved:", savedCourse);
        return new NextResponse("Course has been created", {
            status: 201,
        });
    } catch (error) {
        console.error("Error creating course:", error);
        return new NextResponse(error.message, {
            status: 500,
        });
    }
};
