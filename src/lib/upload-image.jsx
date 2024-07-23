export const UploadImage = async (file, folder) => {
    const cloudinary = require('cloudinary').v2
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise(async (resolve, reject) => {
        cloudinary.uploader.upload_stream({
            resource_type: "auto",
            folder: folder,
        }, async (err, result) => {
            if (err) {
                return reject(err.message);
            }
            return resolve(result);
        })
            .end(bytes);
    })
}