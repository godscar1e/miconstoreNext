import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User',
    },
    text: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        enum: ['user', 'support'],
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message;
