import Message from "@/model/messages";

export async function createMessage(message) {
    try {
        await Message.create(message);
    } catch (e) {
        throw new Error(e);
    }
}

export const getMessagesByUserId = async (userId) => {
    return await Message.find({ userId }).sort({ createdAt: -1 }).exec();
};