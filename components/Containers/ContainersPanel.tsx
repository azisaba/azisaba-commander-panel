import styles from "../../styles/DashboardForm.module.scss";
import React, {useCallback, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {fetchData} from "../../utils/FetchUnit";
import {Alert, Stack} from "@mui/material";
import {ContainerFilter} from "./ContainerFilter";
import {ContainersTable} from "./ContainersTable";
import useInterval from "../../utils/useInterval";

type ContainersPanelType = {
    error?: string
    containers: Container[]
}

export function ContainersPanel() {
    const {data: session} = useSession({required: true})
    //  state
    const [containersState, setContainersState] = useState<ContainersPanelType>({
        error: undefined,
        containers: []
    })
    const [filterState, setFilterState] = useState("")

    const reload = useCallback(async () => {
        if (!session) return

        //  fetch
        const res = await fetchData(
            "containers",
            "GET",
            {},
            session.accessToken
        )

        if (!res || res.response_status != 200) {
            setContainersState((prevState) => ({
                ...prevState,
                error: !res ? "コンテナの取得に失敗しました。" : res.error
            }))
            return
        }

        setContainersState(() => ({
            error: undefined,
            containers: res.containers
        }))
    }, [session])

    useEffect(() => {
        reload().then()
    }, [reload])

    useInterval(() => {
        reload().then()
    }, 5*1000)

    return (
        <>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1>コンテナ一覧</h1>
                    <hr/>
                </div>

                <Stack
                    sx={{
                        width: '100%',
                    }}
                >
                    {containersState.error &&
                        <Alert
                            severity={"error"}
                        >
                            {containersState.error}
                        </Alert>
                    }
                </Stack>

                <ContainerFilter
                    onChange={(value) => setFilterState(value)}
                />
                <ContainersTable
                    filter={filterState}
                    containers={containersState.containers}
                />

            </div>
        </>
    )
}