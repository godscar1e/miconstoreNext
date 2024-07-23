"use client";

import { doSocialLogin } from "@/app/actions";
import Image from "next/image";
import styles from "./SocialLogin.module.scss";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SocialLogins = () => {
    const router = useRouter();
    const [error, setError] = useState(null);

    const handleSignIn = async (provider) => {
        try {
            const result = await signIn(provider, { redirect: false });
            if (result.error) {
                if (result.error.includes("User not found")) {
                    router.push("/register");
                } else {
                    setError(result.error);
                }
            } else {
                router.push("/");
            }
        } catch (error) {
            setError("An unexpected error occurred");
        }
    };

    return (
        <form onSubmit={() => handleSignIn("google")} action={doSocialLogin}>
            <div className={styles.container}>
                <button className={styles.googleButton} type="submit"
                    name="action"
                    value="google">
                    <Image src="/icons/google.svg" alt="Google" width={32} height={32}></Image>
                    <span>Continue with Google</span>
                </button>
            </div>
        </form>
    );
};

export default SocialLogins;