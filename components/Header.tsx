import React from "react"
import styles from "../styles/Header.module.scss"

export class Header extends React.Component<any, any> {

    render() {
        return (
            <header>
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        Azisaba Commander
                    </h1>
                </div>
            </header>
        )
    }
}