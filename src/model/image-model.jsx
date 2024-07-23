import mongoose from 'mongoose';

const CourseFileSchema = new mongoose.Schema({
    image_url: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    moduleNum: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const CourseFileModel = mongoose.models.CourseFile || mongoose.model('CourseFile', CourseFileSchema);

export default CourseFileModel;
