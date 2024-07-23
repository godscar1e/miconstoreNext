import { SessionProvider } from "next-auth/react";
import styles from "../styles/FormStyles.module.scss";

import Header from "@/components/Header/Header";
import ChangePassForm from "@/components/ChangePass/ChangePassForm";

export default function ChangePasswordPage() {
    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.container}>
                <h2 className={styles.title}>Сменить пароль</h2>
                <SessionProvider>
                    <ChangePassForm />
                </SessionProvider>
            </div>
        </div>
    );

};

