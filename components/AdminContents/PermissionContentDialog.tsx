import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, TextFieldProps} from "@mui/material";
import React, {useRef} from "react";

type PermissionContentMethod = "ADD" | "EDIT"

type PermissionContentDialogProps = {
    method: PermissionContentMethod,
    open: boolean
    onClose: VoidFunction
    onUpdate?: (id: number, project: string, service: string) => boolean
    onAdd?: (project: string, service: string) => void
    id?: number
    content?: PermissionContent
}
export function PermissionContentDialog(props: PermissionContentDialogProps) {
    //  ref
    const projectRef = useRef<TextFieldProps>(null)
    const serviceRef = useRef<TextFieldProps>(null)

    return (
        <>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                maxWidth={"md"}
                fullWidth
            >
                <DialogTitle>
                    {
                        props.method == "ADD" ?
                            "Add permission content":
                            "Edit permission content"
                    }
                </DialogTitle>
                <DialogContent>
                    <p>
                        you need to fill two fields.<br/>
                        &quot;Project&quot; is docker-compose project name.<br/>
                        &quot;Service&quot; is docker-composed container name.<br/>
                        Example:<br/>
                        website -{">"} db (User allow to operate only &quto;db&quto; container in &quto;website&quto; project)<br/>
                        website -{">"} * (User allow to operate all containers in&quto;website&quto; project)
                    </p>
                    <TextField
                        type={"text"}
                        name={"project"}
                        label={"Project"}
                        inputRef={projectRef}
                        defaultValue={!props.content ? "": props.content.project}
                        fullWidth
                        required
                        sx={{
                            mt: '20px',
                            mb: '20px'
                        }}
                    />
                    <TextField
                        type={"text"}
                        name={"service"}
                        label={"Service"}
                        inputRef={serviceRef}
                        defaultValue={!props.content ? "": props.content.service}
                        fullWidth
                        required
                        sx={{
                            mt: '20px',
                            mb: '20px'
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant={"outlined"}
                        onClick={props.onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            if (props.method == "ADD"){
                                // @ts-ignore
                                props.onAdd(projectRef.current?.value, serviceRef.current?.value)
                            } else {
                                // @ts-ignore
                                if (props.onUpdate(props.id, projectRef.current?.value, serviceRef.current?.value)) {
                                   props.onClose()
                                }
                            }}}
                    >
                        {
                            props.method == "ADD" ?
                                "Add":
                                "Edit"
                        }
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}