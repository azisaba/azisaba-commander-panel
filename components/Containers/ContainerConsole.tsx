import React, {useCallback, useEffect, useState} from "react";
import {fetchData} from "../../utils/FetchUnit";
import useInterval from "../../utils/useInterval";
import {useSession} from "next-auth/react";
import {Alert, Box, FormControlLabel, Stack, Switch} from "@mui/material";

type ContainerConsoleProps = {
    container: Container
    isDisplay: boolean
}

type ContainerConsoleState = {
    logs: string
    stop: boolean
    error?: string
}

export function ContainerConsole(props: ContainerConsoleProps) {
    const {data: session} = useSession({required: true})
    //  state
    const [consoleState, setConsoleState] = useState<ContainerConsoleState>({
        logs: "",
        stop: false,
        error: undefined
    })

    const reload = useCallback(async () => {
        if (!session || !props.container.docker_id || !props.container.id) return

        //  fetch
        const res = await fetchData(
            "containers/" + props.container.docker_id + "/" + props.container.id + "/logs",
            "GET",
            {},
            session.accessToken
        )

        if (!res || res.response_status != 200) {
            setConsoleState((prevState) => ({
                ...prevState,
                error: "Failed to fetch logs"
            }))
            return
        }

        if(!res.logs) {
            setConsoleState((prevState) => ({
                ...prevState,
                error: "Console is not updated yet."
            }))
            return
        }

        setConsoleState((prevState) => ({
            ...prevState,
            logs: res.logs,
            error: undefined
        }))
    }, [props.container.docker_id, props.container.id, session])

    useEffect(() => {
        reload().then()
    }, [reload])

    useInterval(() => {
        if (!props.isDisplay || consoleState.stop) return
        reload().then()
    }, 10*1000)

    let consoleElements: JSX.Element[] = []
    if(consoleState.logs) {
        consoleElements = consoleState.logs.split('\n').map((value, index) => {
            return (
                <div key={index}>
                    {value}<br/>
                </div>
            )
        })
    }

    return (
        <>
            <div
                hidden={!props.isDisplay}
            >
                {/*Stop Switch*/}
                <FormControlLabel
                    control={
                    <Switch
                        onChange={(event) => {
                            setConsoleState((prevState) => ({
                               ...prevState,
                               stop: event.target.checked
                            }))
                        }}
                    />
                    }
                    label={"Stop"}
                />

                {/*Error*/}
                <Stack
                    sx={{
                        width: '90%',
                        mb: "20px"
                    }}
                >
                    {consoleState.error &&
                        <Alert
                            severity={"error"}
                        >
                            {consoleState.error}
                        </Alert>
                    }
                </Stack>

                <Box
                    sx={{
                        backgroundColor: "#2B2B2B",
                        color: "#ffffff",
                        width: "100%",
                        height: "35vw",
                        borderRadius: "6px",
                        overflowY: "scroll"
                    }}
                >
                    {consoleElements}
                </Box>
            </div>
        </>
    )
}