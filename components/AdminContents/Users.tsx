import {useSession} from "next-auth/react";
import {Alert, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow} from "@mui/material";
import {StyledTableCell, StyledTableRow} from "../TableUtil";
import React, {useEffect, useState} from "react";
import styles from "../../styles/DashboardForm.module.scss";
import {fetchData} from "../../utils/FetchUnit";
import Link from "next/link";

type UsersState = {
    users: User[],
    error?: string
}

export function Users() {
    const {data: session} = useSession()
    //  state
    const [usersState, setUsersState] = useState<UsersState>({
        users: [],
        error: undefined
    })

    useEffect(() => {
        fetchData(
            "users",
            "GET",
            {},
            session?.accessToken
        ).then(res => {
            if (!res) {
                setUsersState((prevState) => ({
                    ...prevState,
                    error: "サーバーがダウンしています。"
                }))
                return
            }

            if (res.response_status != 200) {
                setUsersState((prevState) => ({
                    ...prevState,
                    error: "ユーザーの取得に失敗しました。エラー: " + res.error
                }))
                return
            }

            setUsersState(() => ({
                users: res.users,
                error: undefined
            }))
        })
    }, [session])


    return (
        <>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1>ユーザー管理</h1>
                    <hr/>
                </div>

                <Stack
                    sx={{
                        width: '50%',
                    }}
                >
                    {usersState.error &&
                        <Alert
                            severity={"error"}
                        >
                            {usersState.error}
                        </Alert>
                    }
                </Stack>

                <TableContainer
                    component={Paper}
                    sx={{
                        mt: "20px"
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align={"left"}>ID</StyledTableCell>
                                <StyledTableCell align={"center"}>Name</StyledTableCell>
                                <StyledTableCell align={"center"}>Group</StyledTableCell>
                                <StyledTableCell align={"right"}>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                usersState.users.map(value => (
                                    <StyledTableRow
                                        key={value.id}
                                    >
                                            <StyledTableCell align={"left"}>{value.id}</StyledTableCell>
                                            <StyledTableCell align={"center"}>{value.username}</StyledTableCell>
                                            <StyledTableCell align={"center"}>{value.group}</StyledTableCell>
                                            <StyledTableCell align={"right"}>
                                                <Link
                                                    href={"/admin/users/"+value.id}
                                                    style={{
                                                        color: "blue"
                                                    }}
                                                >
                                                    詳細
                                                </Link>
                                            </StyledTableCell>
                                    </StyledTableRow>

                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}