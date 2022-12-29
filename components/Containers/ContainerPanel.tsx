import {
    BottomNavigation,
    BottomNavigationAction,
    Dialog,
    DialogContent,
    DialogTitle
} from "@mui/material";
import {useState} from "react";
import {faCircleInfo, faTerminal} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ContainerDetails} from "./ContainerDetails";
import {ContainerConsole} from "./ContainerConsole";

type ContainerPanelProps = {
    container: Container
    open: boolean
    onClose: VoidFunction
}

export function ContainerPanel(props: ContainerPanelProps) {
    //  state
    const [pageState, setPageState] = useState(0)

    return (
        <>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                maxWidth={"lg"}
                fullWidth
            >
                <DialogTitle>
                    {props.container.name} ({props.container.project_name}:{props.container.service_name})
                </DialogTitle>
                <DialogContent>
                    <BottomNavigation
                        showLabels
                        value={pageState}
                        onChange={(event, newValue) => {
                            setPageState(newValue)
                        }}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "70%",
                            marginX: "auto"
                        }}
                    >
                        <BottomNavigationAction
                            label="Detail"
                            icon={
                                <FontAwesomeIcon
                                    icon={faCircleInfo}
                                />
                            }
                        />
                        <BottomNavigationAction
                            label="Console"
                            icon={
                                <FontAwesomeIcon
                                    icon={faTerminal}
                                />
                            }
                        />
                    </BottomNavigation>

                    {/*details*/}
                    <ContainerDetails
                        container={props.container}
                        isDisplay={pageState == 0}
                    />

                    {/*console*/}
                    <ContainerConsole
                        container={props.container}
                        isDisplay={pageState == 1}
                    />

                </DialogContent>
            </Dialog>
        </>
    )
}