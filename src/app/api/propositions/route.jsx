import { NextResponse } from "next/server";
import { createProposition } from "@/queries/propositions";
import { dbConnect } from "@/lib/mongo";

export const POST = async (request) => {
    try {
        const { title, proposition, textarea, attachments, userId } = await request.json();

        console.log("Received data:", { title, proposition, textarea, attachments, userId });

        await dbConnect();

        const newProposition = {
            title,
            proposition,
            textarea,
            attachments,
            userId
        };

        console.log("Message to be saved:", newProposition);

        const savedProposition = await createProposition(newProposition);
        console.log("Saved Message:", savedProposition);

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

// const upload = multer({
//     storage: multer.memoryStorage(),
// });

// const apiRoute = nextConnect({
//     onError(error, req, res) {
//         res.status(501).json({ error: `Sorry, something went wrong! ${error.message}` });
//     },
//     onNoMatch(req, res) {
//         res.status(405).json({ error: `Method '${req.method}' not allowed` });
//     },
// });

// apiRoute.use(upload.single('file'));

// apiRoute.post(async (req, res) => {
//     try {
//         await dbConnect();
//         console.log("connected");

//         // Logging request data for debugging
//         console.log("Request Body:", req.body);
//         if (req.file) {
//             console.log("File Info:", {
//                 originalname: req.file.originalname,
//                 mimetype: req.file.mimetype,
//                 size: req.file.size,
//             });
//         }

//         const newProposition = {
//             title: req.body.title,
//             proposition: req.body.proposition,
//             attachments: req.file ? req.file.buffer : null,
//             filename: req.file ? req.file.originalname : null,
//             contentType: req.file ? req.file.mimetype : null,
//             userId: req.body.userId,
//             timestamp: new Date(),
//         };

//         console.log("New Proposition Data:", newProposition); // Logging data

//         const savedProposition = await Proposition.create(newProposition);
//         res.status(201).json({ message: 'File uploaded successfully', data: savedProposition });
//     } catch (error) {
//         console.error('Error creating proposition:', error);
//         res.status(500).json({ error: 'Error creating proposition' });
//     }
// });

// export default apiRoute;

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

