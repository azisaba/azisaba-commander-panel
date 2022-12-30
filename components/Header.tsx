import React from "react"
import styles from "../styles/Header.module.scss"
import Link from "next/link";
import {Button} from "@mui/material";
import {signOut, useSession} from "next-auth/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";

export function Header() {
    const {data: session} = useSession()

    return (
        <header>
            <div className={styles.header}>
                <Link
                    href={"/admin"}
                    className={styles.settings}
                >
                    <FontAwesomeIcon icon={faGear} />
                </Link>
                <Link href={"/"}>
                    <h1 className={styles.title}>
                        アズスバ司令官 translate by Goooogle
                    </h1>
                </Link>
                {session == null ?
                    <Link href={"/auth/signin"} className={styles.login}>
                        サインイン
                    </Link>
                    :
                    <h2 className={styles.welcome_user}>
                        お元気ですか! {session.user.name}
                        <Button
                            onClick={() => signOut()}
                        >
                            サインアウト
                        </Button>
                    </h2>
                }
            </div>
        </header>
    )

}