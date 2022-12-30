import React, {useRef, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, IconButton,
    Paper,
    Table, TableBody,
    TableContainer, TableHead, TableRow,
    TextField,
    TextFieldProps
} from "@mui/material";
import {StyledTableCell} from "../TableUtil";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Permission} from "./Permission";
import {PermissionContentDialog} from "./PermissionContentDialog";
import {PermissionContent} from "./PermissionContent";
import {fetchData} from "../../utils/FetchUnit";
import {useSession} from "next-auth/react";

type PermissionFormMethod = "CREATE" | "EDIT"

type PermissionFormProps = {
    open: boolean
    setClose: VoidFunction
    method: PermissionFormMethod
    reload: VoidFunction
    permission?: Permission
}

type PermissionContentState = {
    content: PermissionContent[]
}

export function PermissionForm(props: PermissionFormProps) {
    const {data: session} = useSession()
    //  ref
    const nameRef = useRef<TextFieldProps>(null)
    //  state
    const [openAdder, setOpenAdder] = useState(false)
    const [contentsState, setContentsState] = useState<PermissionContentState>({
        content: !props.permission ? [] : props.permission.content
    })

    const addContent = (project: string, service: string) => {
        if (project && service && project != '' && service != '') {
            setContentsState((prevState) => {
                let value = prevState.content
                value.push({
                    project: project,
                    service: service
                })

                return {
                    content: value
                }
            })

            setOpenAdder(false)
        }
    }

    const updateContent = (index: number, project: string, service: string): boolean => {
        if (project && service && project != '' && service != '') {
            setContentsState((prevState) => {
                let value = prevState.content
                value[index] = {
                    project: project,
                    service: service
                }

                return {
                    content: value
                }
            })
            return true
        }

        return false
    }

    const deleteContent = (index: number) => {
        console.log(contentsState.content[index])
        setContentsState((prevState) => {
            const value = prevState.content.concat()
            value.splice(index, 1)
            return {
                content: value
            }
        })
    }

    const handlerSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        if (nameRef.current && nameRef.current.value && nameRef.current.value != '') {
            const res = await fetchData(
                "permissions",
                props.method == "CREATE" ? "POST" : "PATCH",
                {
                    id: props.permission ? props.permission.id: 0,
                    name: nameRef.current.value,
                    content: contentsState.content
                },
                session?.accessToken
            )
            if (!res || res.response_status != 200) {
                console.log("パーミッションの変更に失敗しました。")
            }

            await props.reload()
            //  close
            props.setClose()
        }
    }

    return (
        <>
            <Dialog
                open={props.open}
                onClose={props.setClose}
                maxWidth={"lg"}
                fullWidth
            >
                <form
                    onSubmit={handlerSubmit}
                >
                    <DialogTitle>{
                        props.method == "CREATE" ?
                            "パーミッション作成" :
                            "パーミッション編集"
                    }</DialogTitle>
                    <DialogContent>
                        <TextField
                            type={"text"}
                            name={"name"}
                            id={"name"}
                            label={"パーミッション名"}
                            inputRef={nameRef}
                            defaultValue={!props.permission ? "" : props.permission.name}
                            fullWidth
                            required
                            sx={{
                                mt: '20px',
                                mb: '20px'
                            }}
                        />

                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Project</StyledTableCell>
                                        <StyledTableCell>Service</StyledTableCell>
                                        <StyledTableCell align={"right"}>Actions</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        contentsState.content.map((value, index) => (
                                            <PermissionContent
                                                key={index}
                                                id={index}
                                                content={value}
                                                onUpdate={updateContent}
                                                onDelete={deleteContent}
                                            />
                                        ))
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>

                        <IconButton
                            sx={{
                                float: "right"
                            }}
                            onClick={() => setOpenAdder(true)}
                        >
                            <AddCircleIcon/>
                        </IconButton>

                        <PermissionContentDialog
                            method={"ADD"}
                            open={openAdder}
                            onClose={() => setOpenAdder(false)}
                            onAdd={addContent}
                        />


                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant={"outlined"}
                            onClick={props.setClose}
                        >
                            キャンセル
                        </Button>
                        <Button
                            type={"submit"}
                            variant={"contained"}
                        >
                            {
                                props.method == "CREATE" ?
                                    "作成" :
                                    "編集"
                            }
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}