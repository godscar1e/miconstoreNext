import { doLogout } from "@/app/actions";

import styles from "@/app/profile/Profile.module.scss";

const Logout = () => {
    const handleLogout = async (event) => {
        event.preventDefault();
        await doLogout();
    };

    return (
        <form onSubmit={handleLogout}>
            <button className={styles.list_button} type="submit">Выйти</button>
        </form>
    );
};

export default Logout;