
import mongoose from 'mongoose';

const CourseFileSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
});

let CourseFileModel;
if (mongoose.models.File) {
    CourseFileModel = mongoose.model('File');
} else {
    CourseFileModel = mongoose.model('File', CourseFileSchema);
}

export default CourseFileModel;
