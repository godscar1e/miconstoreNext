"use client";

import { doCredentialLogin } from "@/app/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState("");

    async function onSubmit(event) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);

            const response = await doCredentialLogin(formData);
            if (!!response.error) {
                console.error(response.error);
                setError(response.error.message);
            } else {
                router.push("/");
            }
        } catch (e) {
            console.error(e);
            setError("Check your Credentials");
        }
    }
    return (
        <>
            <div>{error}</div>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required />
                </div>
                <button type="submit">Login</button>
            </form>

        </>
    );
};


