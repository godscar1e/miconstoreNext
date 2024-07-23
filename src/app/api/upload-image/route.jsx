import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { UploadImage } from "@/lib/upload-image";
import CourseFileModel from "@/model/image-model";

dbConnect();

export const GET = async (req) => {
    const files = await CourseFileModel.find({});
    return NextResponse.json({ files, total: files.length }, { status: 200 });
};

export const POST = async (req) => {
    const formData = await req.formData();
    const image = formData.get("image");
    const fileName = formData.get("fileName");
    const courseName = formData.get("courseName");
    const moduleNum = formData.get("moduleNum");

    console.log("Received data:", {
        image,
        fileName,
        courseName,
        moduleNum
    });

    try {
        const data = await UploadImage(image, "LadSite/course-files");

        // Log data from Cloudinary
        console.log("Uploaded data:", data);

        const newFile = await CourseFileModel.create({
            image_url: data?.secure_url,
            public_id: data?.public_id,
            fileName: fileName || '',
            courseName: courseName || '',
            moduleNum: moduleNum || ''
        });

        console.log("Saved data:", newFile);

        return NextResponse.json({ msg: data }, { status: 200 });
    } catch (error) {
        console.error("Error saving file:", error);
        return NextResponse.json({ error: "Error saving file" }, { status: 500 });
    }
};
