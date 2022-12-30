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
                            "パーミッションコンテンツの追加":
                            "パーミッションコンテンツの編集"
                    }
                </DialogTitle>
                <DialogContent>
                    <p>
                        &quot;Project&quot;はdocker-compose.ymlがあるディレクトリ名に当たります。<br/>
                        &quot;Service&quot;はdocker-composeのサービス名に当たります。<br/>
                        例:<br/>
                        website -{">"} db (&quot;website&quot;ディレクトリの&quot;db&quot;サービスが対象になります。)<br/>
                        website -{">"} * (&quot;website&quot;ディレクトリの全てのサービスが対象になります。)
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
                        キャンセル
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
                                "追加":
                                "編集"
                        }
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}