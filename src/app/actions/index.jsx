'use server'
import { revalidatePath } from "next/cache";

import { signIn, signOut } from "@/auth";
import { setHasFetchedSession } from "@/components/SessionLogger";

export async function doSocialLogin(formData) {
    const action = formData.get('action');
    await signIn(action, { redirectTo: "/" });
}

export async function doLogout() {
    await signOut({ redirectTo: "/" });
    setHasFetchedSession(true);
}
export async function doCredentialLogin(formData) {
    console.log("formData", formData);

    try {
        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });
        revalidatePath("/");

        if (response.ok) {
            const sessionResponse = await fetch("/api/auth/session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });

            if (!sessionResponse.ok) {
                throw new Error("Failed to update session");
            }
        }

        return response;
    } catch (err) {
        throw err;
    }
}