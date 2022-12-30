import {useSession} from "next-auth/react";
import React, {useCallback, useEffect, useState} from "react";
import {fetchData} from "../../utils/FetchUnit";
import {Alert, Fab, Stack} from "@mui/material";
import styles from "../../styles/DashboardForm.module.scss";
import {PermissionsTable} from "./PermissionsTable";
import {PermissionForm} from "./PermissionForm";
import AddIcon from "@mui/icons-material/Add";

type PermissionsPanelState = {
    permissions: Permission[]
    error?: string
}

export function PermissionsPanel() {
    const {data: session} = useSession()
    //  state
    const [state, setState] = useState<PermissionsPanelState>({
        permissions: [],
        error: undefined
    })
    const [openCreator, setOpenCreator] = useState(false)

    const reload = useCallback(async (): Promise<void> => {
        const res = await fetchData(
            "permissions",
            "GET",
            {},
            session?.accessToken
        )
        if (!res) {
            setState((prevState) => ({
                ...prevState,
                error: "サーバーがダウンしています。"
            }))
            return
        }

        if (res.response_status != 200) {
            setState((prevState) => ({
                ...prevState,
                error: "データの取得に失敗しました。エラー: " + res.error
            }))
            return
        }

        setState((prevState) => ({
            ...prevState,
            error: undefined,
            permissions: res.permissions
        }))

    }, [session])

    useEffect(() => {
        reload().then()
    }, [reload, session])

    return (
        <>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1>パーミッション管理</h1>
                    <hr/>
                </div>
                <Stack
                    sx={{
                        width: '100%',
                    }}
                >
                    {state.error &&
                        <Alert
                            severity={"error"}
                        >
                            {state.error}
                        </Alert>
                    }
                </Stack>

                <PermissionsTable permissions={state.permissions} reload={reload}/>

                <PermissionForm
                    open={openCreator}
                    setClose={() => setOpenCreator(false)}
                    method={"CREATE"}
                    reload={reload}
                />

                <div
                    style={{
                        position: "absolute",
                        right: "40px",
                        bottom: "40px"
                    }}
                >
                    <Fab size={"small"} color={"primary"} onClick={() => setOpenCreator(true)}>
                        <AddIcon/>
                    </Fab>
                </div>
            </div>
        </>
    )
}