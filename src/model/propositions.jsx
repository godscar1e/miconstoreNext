import mongoose from 'mongoose';

const propositionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    proposition: {
        type: String,
        required: true,
    },
    attachments: {
        type: Buffer,
        required: false,
    },
    filename: {
        type: String,
        required: false,
    },
    contentType: {
        type: String,
        required: false,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Proposition = mongoose.models.Proposition || mongoose.model('Proposition', propositionSchema);

export default Proposition;
