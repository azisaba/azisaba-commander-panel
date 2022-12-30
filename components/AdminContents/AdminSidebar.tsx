import styles from "../../styles/AdminSidebar.module.scss"
import {Avatar, Box, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {stringAvatar} from "../../utils/AvaterUtil"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import {useSession} from "next-auth/react";
import Link from "next/link";

export function AdminSidebar() {
    const {data: session} = useSession()
    if (!session) return null

    return (
        <>
            <div className={styles.profile}>
                <Avatar
                    {...stringAvatar(session.user.name ?? "Unknown")}
                    sx={{
                        width: "36px",
                        height: "36px"
                    }}
                />
                <p className={styles.username}>{session.user.name ?? "Unknown"}</p>
            </div>

            <Box>
                {/*Account setting*/}
                <ListItemButton
                    sx={{
                        py: 0,
                        minHeight: 32
                    }}
                    href={"/admin/account"}
                >
                    <ListItemIcon
                        sx={{
                            mr: "-20px"
                        }}
                    >
                        <AccountCircleIcon/>
                    </ListItemIcon>
                    <ListItemText
                        primary={"アカウント"}
                        primaryTypographyProps={{fontSize: 14, fontWeight: 'medium'}}
                    />
                </ListItemButton>
                {session.user.group == "admin" &&
                    <>
                        {/*Users*/}
                        <ListItemButton
                            sx={{
                                py: 0,
                                minHeight: 32
                            }}
                            href={"/admin/users"}
                        >
                            <ListItemIcon
                                sx={{
                                    mr: "-20px"
                                }}
                            >
                                <PeopleIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary={"ユーザー管理"}
                                primaryTypographyProps={{fontSize: 14, fontWeight: 'medium'}}
                            />
                        </ListItemButton>
                        {/*Permissions*/}
                        <ListItemButton
                            sx={{
                                py: 0,
                                minHeight: 32
                            }}
                            href={"/admin/permissions"}
                        >
                            <ListItemIcon
                                sx={{
                                    mr: "-20px"
                                }}
                            >
                                <AssignmentIndIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary={"パーミッション管理"}
                                primaryTypographyProps={{fontSize: 14, fontWeight: 'medium'}}
                            />
                        </ListItemButton>
                    </>
                }
            </Box>

            <Link
                href={"/"}
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    padding: "20px 20px",
                    color: "blue"
                }}
            >
                コンテナ一覧に戻る
            </Link>
        </>
    )

}