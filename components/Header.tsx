import React from "react"
import styles from "../styles/Header.module.scss"
import Link from "next/link";

export class Header extends React.Component<any, any> {

    render() {
        return (
            <header>
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        Azisaba Commander
                    </h1>
                    <Link href={""}>
                        <a className={styles.login}>Login</a>
                    </Link>
                </div>
            </header>
        )
    }
}