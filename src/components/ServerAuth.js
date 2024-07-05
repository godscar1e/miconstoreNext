// components/ServerAuth.js
import { auth } from "@/auth";

const ServerAuth = async ({ children }) => {
    const session = await auth();
    return children(session);
};

export default ServerAuth;
