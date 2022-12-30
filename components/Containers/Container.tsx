import {Card, CardActionArea, CardContent, Grid, Typography} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faMemory, faMicrochip, faNetworkWired, faServer} from "@fortawesome/free-solid-svg-icons";
import {ContainerPanel} from "./ContainerPanel";
import {useState} from "react";

export function Container(props: { container: Container }) {
    //  state
    const [openPanel, setOpenPanel] = useState(false)

    return (
        <>
            <Grid item>
                <Card
                    sx={{
                        backgroundColor: "#f5f5f5"
                    }}
                >
                    <CardActionArea
                        onClick={() => setOpenPanel(true)}
                    >
                        <CardContent
                            sx={{
                                width: "300px"
                            }}
                        >
                            <Typography
                                variant={"h5"}
                                noWrap
                            >
                                {props.container.name}
                            </Typography>
                            <Typography
                                variant={"body1"}
                                noWrap
                            >
                                ノード: {props.container.docker_name}
                            </Typography>
                            <Typography
                                variant={"body1"}
                                noWrap
                            >
                                プロジェクト: {props.container.project_name}
                            </Typography>
                            <Typography
                                variant={"body1"}
                                noWrap
                            >
                                サービス: {props.container.service_name}
                            </Typography>
                            <br/>
                            {/*Status*/}
                            {props.container.status &&
                                <>
                                    <Typography
                                        variant={"body1"}
                                        noWrap
                                    >
                                        <FontAwesomeIcon
                                            icon={faServer}
                                            style={{
                                                marginRight: "10px"
                                            }}
                                        />
                                        <span style={{
                                            color: props.container.status.state.status == "running" ? "green" : "red"
                                        }}>
                                            {
                                                props.container.status.state.status == "running" ? (
                                                    "起動"
                                                ) : props.container.status.state.status == "exited" ? (
                                                    "停止"
                                                ) : props.container.status.state.status == "restarting" ? (
                                                    "再起動中"
                                                ) : props.container.status.state.status == "paused" ? (
                                                    "一時停止"
                                                ) : props.container.status.state.status == "dead" ? (
                                                    "クラッシュ"
                                                ) : props.container.status.state.status == "created" ? (
                                                    "作成中"
                                                ) : (
                                                    props.container.status.state.status
                                                )
                                            }
                                        </span>
                                    </Typography>
                                    <Typography
                                        variant={"body1"}
                                        noWrap
                                    >
                                        <FontAwesomeIcon
                                            icon={faClock}
                                            style={{
                                                marginRight: "10px"
                                            }}
                                        />
                                        {new Date(props.container.status.state.started_at).toLocaleString(undefined, {timeZone: 'Asia/Tokyo'})}
                                    </Typography>
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
                                                color: props.container.status.cpu_stats.percent > 90 ? "red": ""
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
                                        {Math.floor(props.container.status.memory_stats.usage / Math.pow(10, 6))}MB
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
                                        />
                                        TX {Math.floor(props.container.status.network_stats.tx_byte_per_sec / Math.pow(10, 6))}MB/s
                                        RX {Math.floor(props.container.status.network_stats.rx_byte_per_sec / Math.pow(10, 6))}MB/s
                                    </Typography>
                                </>
                            }
                        </CardContent>
                    </CardActionArea>
                </Card>

                {/*Panel*/}
                <ContainerPanel
                    open={openPanel}
                    onClose={() => setOpenPanel(false)}
                    container={props.container}
                />
            </Grid>
        </>
    )
}