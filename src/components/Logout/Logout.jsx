import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { doLogout } from "@/app/actions";
import profileStyles from "@/app/profile/Profile.module.scss";

import styles from "./Logout.module.scss"

const Logout = () => {
    const handleLogout = async () => {
        await doLogout();
    };

    const confirmLogout = (event) => {
        event.preventDefault();
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className={styles.customAlert}>
                        <h1>Подтвердите выход</h1>
                        <p>Вы действительно хотите выйти?</p>
                        <div className={styles.buttonContainer}>
                            <button
                                className={styles.confirmButton}
                                onClick={() => {
                                    handleLogout();
                                    onClose();
                                }}
                            >
                                Да
                            </button>
                            <button
                                className={styles.cancelButton}
                                onClick={onClose}
                            >
                                Нет
                            </button>
                        </div>
                    </div>
                );
            },
        });
    };

    return (
        <form onSubmit={confirmLogout}>
            <button className={profileStyles.logoutButton} type="submit">
                Выйти
            </button>
        </form>
    );
};

export default Logout;
