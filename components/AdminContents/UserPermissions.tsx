import styles from "../../styles/DashboardForm.module.scss";
import React, {useCallback, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {fetchData} from "../../utils/FetchUnit";
import {Alert, Fab, Stack} from "@mui/material";
import {UserPermissionsTable} from "./UserPermissionsTable";
import AddIcon from "@mui/icons-material/Add";
import {UserPermissionForm} from "./UserPermissionForm";

type PermissionsPanelState = {
    permissions: Permission[]
    error?: string
}

export function UserPermissions(props: { user: User }) {
    const {data: session} = useSession()
    //  state
    const [state, setState] = useState<PermissionsPanelState>({
        permissions: [],
        error: undefined
    })
    const [openAdder, setOpenAdder] = useState(false)

    const reload = useCallback(async (): Promise<void> => {
        const res = await fetchData(
            "users/"+ props.user.id +"/permissions",
            "GET",
            {},
            session?.accessToken
        )

        if (!res) {
            setState((prevState) => ({
                ...prevState,
                error: "Sorry. Server is down now"
            }))
        }

        if (res != 200) {
            setState((prevState) => ({
                ...prevState,
                error: "Failed to fetch data. " + res.error
            }))
        }

        setState((prevState) => ({
            ...prevState,
            error: undefined,
            permissions: res.permissions
        }))

    }, [props.user.id, session?.accessToken])

    useEffect(() => {
        reload().then()
    }, [reload, session])

    return (
        <>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1>Permissions</h1>
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

                <UserPermissionsTable
                    user={props.user}
                    permissions={state.permissions}
                    reload={reload}
                />

                <UserPermissionForm
                    user={props.user}
                    permissions={state.permissions}
                    reload={reload}
                    open={openAdder}
                    onClose={() => setOpenAdder(false)}
                />
                <div
                    style={{
                        position: "fixed",
                        right: "40px",
                        bottom: "40px"
                    }}
                >
                    <Fab size={"small"} color={"primary"} onClick={() => setOpenAdder(true)}>
                        <AddIcon/>
                    </Fab>
                </div>


            </div>
        </>
    )
}