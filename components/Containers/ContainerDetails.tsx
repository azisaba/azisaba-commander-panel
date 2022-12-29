import {Alert, Backdrop, Button, CircularProgress, DialogActions, Stack, Typography} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faMemory,
    faMicrochip,
    faNetworkWired,
    faPowerOff,
    faRotateRight,
    faCirclePlay
} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import {fetchData} from "../../utils/FetchUnit";
import {useSession} from "next-auth/react";

type ContainerDetailsProps = {
    container: Container,
    isDisplay: boolean
}

type ContainerDetailsState = {
    error?: string
    success?: string
}

type ServerActionMethod = "START" | "STOP" | "RESTART"

export function ContainerDetails(props: ContainerDetailsProps) {
    const {data: session} = useSession()
    //  state
    const [isWaiting, setIsWaiting] = useState(false)
    const [resultState, setResultState] = useState<ContainerDetailsState>({
        error: undefined,
        success: undefined
    })

    const onServerAction = async (method: ServerActionMethod) => {
        setIsWaiting(true)

        //  fetch
        const res = await fetchData(
            "containers/" + props.container.docker_id + "/" + props.container.id + "/" + method.toLowerCase(),
            "POST",
            {},
            session?.accessToken
        )

        if (!res) {
            setResultState(() => ({
                error: "Sorry. Server is down now.",
                success: undefined
            }))

            setIsWaiting(false)
            return
        }

        if (res.response_status != 200) {
            setResultState(() => ({
                error: res.error,
                success: undefined
            }))

            setIsWaiting(false)
            return
        }

        setResultState(() => ({
            error: undefined,
            success: "Succeeded to "+ method.toLowerCase() +" server!"
        }))

        setIsWaiting(false)
    }

    return (
        <>
            <div
                hidden={!props.isDisplay}
            >
                <Stack
                    sx={{
                        width: '90%',
                        mb: "20px"
                    }}
                >
                    {resultState.error &&
                        <Alert
                            severity={"error"}
                        >
                            {resultState.error}
                        </Alert>
                    }
                    {resultState.success &&
                        <Alert
                            severity={"success"}
                        >
                            {resultState.success}
                        </Alert>
                    }
                </Stack>

                {/*waiting*/}
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={isWaiting}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>

                {/*Status*/}
                {props.container.status &&
                    <>
                        <Typography
                            variant={"body1"}
                            noWrap
                        >
                            Status:&nbsp;
                            <span style={{
                                color: props.container.status.state.status == "running" ? "green" : "red"
                            }}>
                                {props.container.status.state.status}
                            </span>
                        </Typography>
                        <Typography
                            variant={"body1"}
                            noWrap
                        >
                            Created
                            at: {new Date(props.container.created_at).toLocaleString(undefined, {timeZone: 'Asia/Tokyo'})}
                            <br/>
                            Started
                            at: {new Date(props.container.status.state.started_at).toLocaleString(undefined, {timeZone: 'Asia/Tokyo'})}
                        </Typography>
                        <br/>
                        <Typography
                            variant={"body1"}
                            noWrap
                        >
                            <FontAwesomeIcon
                                icon={faMicrochip}
                                style={{
                                    marginRight: "10px"
                                }}
                            />
                            <span
                                style={{
                                    color: props.container.status.cpu_stats.percent > 90 ? "red" : ""
                                }}
                            >
                                {Math.floor(props.container.status.cpu_stats.percent)}%
                            </span>
                        </Typography>
                        <Typography
                            variant={"body1"}
                            noWrap
                        >
                            <FontAwesomeIcon
                                icon={faMemory}
                                style={{
                                    marginRight: "10px"
                                }}
                            />
                            <span
                                style={{
                                    color: props.container.status.memory_stats.percent > 90 ? "red" : ""
                                }}
                            >
                            {Math.floor(props.container.status.memory_stats.percent)}
                            </span>
                            %&nbsp;
                            (
                            {Math.floor(props.container.status.memory_stats.usage / Math.pow(10, 6))}MB
                            &nbsp;/&nbsp;
                            {Math.floor(props.container.status.memory_stats.limit / Math.pow(10, 6))}MB
                            )
                        </Typography>
                        <Typography
                            variant={"body1"}
                            noWrap
                        >
                            <FontAwesomeIcon
                                icon={faNetworkWired}
                                style={{
                                    marginRight: "10px"
                                }}
                            /> Networks
                            <br/>

                            TX: <br/>
                            {/*Byte*/}
                            {Math.floor(props.container.status.network_stats.tx_byte_per_sec / Math.pow(10, 6))} MB/s&nbsp;
                            (Total: {Math.floor(props.container.status.network_stats.tx_total_byte / Math.pow(10, 6))} MB)
                            <br/>
                            {/*Packet*/}
                            {Math.floor(props.container.status.network_stats.tx_packet_per_sec)} Packets/s&nbsp;
                            (Total: {props.container.status.network_stats.tx_total_packet} Packets)
                            <br/>

                            RX: <br/>
                            {/*Byte*/}
                            {Math.floor(props.container.status.network_stats.rx_byte_per_sec / Math.pow(10, 6))} MB/s&nbsp;
                            (Total: {Math.floor(props.container.status.network_stats.rx_total_byte / Math.pow(10, 6))} MB)
                            <br/>
                            {/*Packet*/}
                            {Math.floor(props.container.status.network_stats.rx_packet_per_sec)} Packets/s&nbsp;
                            (Total: {props.container.status.network_stats.rx_total_packet} Packets)
                        </Typography>
                    </>
                }

                {/*Actions*/}
                <DialogActions
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "70%",
                        marginX: "auto"
                    }}
                >
                    <Button
                        onClick={() => onServerAction("START")}
                    >
                        <FontAwesomeIcon icon={faCirclePlay}/>&nbsp;
                        Start
                    </Button>
                    <Button
                        onClick={() => onServerAction("RESTART")}
                    >
                        <FontAwesomeIcon icon={faRotateRight}/>&nbsp;
                        Restart
                    </Button>
                    <Button
                        onClick={() => onServerAction("STOP")}
                    >
                        <FontAwesomeIcon icon={faPowerOff}/>&nbsp;
                        Stop
                    </Button>
                </DialogActions>
            </div>
        </>
    )
}