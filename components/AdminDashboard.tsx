import styles from "../styles/AdminDashboard.module.scss"
import {AdminSidebar} from "./AdminContents/AdminSidebar";
import {ReactNode} from "react";

export function AdminDashboard(props: {children: ReactNode}) {
    return (
        <>
            <div className={styles.board}>
                <div className={styles.sidebar}>
                    <AdminSidebar />
                </div>
                <div className={styles.content}>
                    {props.children}
                </div>
            </div>
        </>
    )
}