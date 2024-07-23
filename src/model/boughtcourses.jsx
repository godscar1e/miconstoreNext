import mongoose from 'mongoose';

const boughtCourseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    course: {
        type: String,
        required: true,
    },
    pack: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const BoughtCourse = mongoose.models.BoughtCourse || mongoose.model('BoughtCourse', boughtCourseSchema);

export default BoughtCourse;
