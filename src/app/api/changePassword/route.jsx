import { getSession } from 'next-auth/react';
import dbConnect from '@/lib/mongo';
import User from '@/model/user-model';

export const POST = async (request) => {
    await dbConnect();
    const session = await getSession({ req });

    // Check if session exists
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { userId, newPassword } = await request.json();

    // Check for required data
    if (!userId || !newPassword) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Update user password in the database
        await User.findOneAndUpdate(
            { id: userId },
            { password: newPassword }
        );

        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
