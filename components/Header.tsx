import React from "react"
import styles from "../styles/Header.module.scss"
import Link from "next/link";
import {Button} from "@mui/material";
import {signOut, useSession} from "next-auth/react";

export function Header() {
    const {data: session} = useSession()

    return (
        <header>
            <div className={styles.header}>
                <Link href={"/"}>
                    <h1 className={styles.title}>
                        Azisaba Commander
                    </h1>
                </Link>
                {session == null ?
                    <Link href={"/auth/signin"} className={styles.login}>
                        Sign in
                    </Link>
                    :
                    <h2 className={styles.welcome_user}>
                        Hi! {session.user.name}
                        <Button
                            onClick={() => signOut()}
                        >
                            Sign out
                        </Button>
                    </h2>
                }
            </div>
        </header>
    )

}