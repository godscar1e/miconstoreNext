"use server"
import { dbConnect } from '@/lib/mongo';
import { User } from '@/model/user-model';
import NodeCache from "node-cache";

const userCache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

export async function getUserData(email) {
    const cachedUser = userCache.get(email);
    if (cachedUser) {
        console.log('Returning cached user data:', cachedUser);
        return cachedUser;
    }

    await dbConnect();
    console.log('Querying user with email:', email); // Debug log

    try {
        const start = Date.now();
        const user = await User.findOne({ email }).exec();
        const end = Date.now();
        console.log(`Query executed in ${end - start}ms`); // Log query time

        if (!user) {
            console.warn('User not found'); // Debug log
            return null;
        }

        const userData = {
            id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone,
        };

        userCache.set(email, userData); // Cache the user data
        return userData;
    } catch (e) {
        console.error('Error fetching user:', e);
        return null;
    }
}
