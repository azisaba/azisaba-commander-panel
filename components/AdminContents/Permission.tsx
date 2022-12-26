import {
    Button,
    DialogContent,
    DialogTitle,
    Stack,
} from "@mui/material";
import React, {useState} from "react";
import {ConfirmDialog} from "../ConfirmDialog";
import {PermissionForm} from "./PermissionForm";
import {StyledTableCell, StyledTableRow} from "../TableUtil";
import {useSession} from "next-auth/react";
import {fetchData} from "../../utils/FetchUnit";

export function Permission(props: { permission: Permission, reload: VoidFunction}) {
    const {data: session} = useSession()
    //  state
    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    const deletePermission = async () => {
        const res = await fetchData(
            "permissions/"+props.permission.id,
            "DELETE",
            {},
            session?.accessToken
        )

        if (!res || res.response_status != 200) {
            console.log("Failed to delete permission")
            return
        }

        await props.reload()
    }

    return (
        <>
            <StyledTableRow>
                <StyledTableCell align={"left"}>{props.permission.id}</StyledTableCell>
                <StyledTableCell align={"left"}>{props.permission.name}</StyledTableCell>
                <StyledTableCell align={"center"}>
                    <Stack>
                        {props.permission.content.map((value, index) => (
                            <div key={index}>
                                {value.project + " -> " + value.service}
                            </div>
                        ))}
                    </Stack>
                </StyledTableCell>
                <StyledTableCell align={"right"}>
                    <Button
                        size={"small"}
                        onClick={() => setOpenEdit(true)}
                    >
                        Edit
                    </Button>
                    <Button
                        size={"small"}
                        onClick={() => setOpenDelete(true)}
                    >
                        Delete
                    </Button>
                </StyledTableCell>
            </StyledTableRow>

            {/*Edit Dialog*/}
            <PermissionForm
                open={openEdit}
                setClose={() => setOpenEdit(false)}
                method={"EDIT"}
                permission={props.permission}
                reload={props.reload}
            />

            {/*Delete Dialog*/}
            <ConfirmDialog
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={deletePermission}
                confirmText={"Delete"}
                confirmColor={"warning"}
            >
                <DialogTitle>
                    Delete &quot;{props.permission.name}&quot;
                </DialogTitle>
                <DialogContent>
                    Are you sure to delete &quot;{props.permission.name}&quot; permission?<br/>
                    Deleted Permission cant restore.
                </DialogContent>
            </ConfirmDialog>

        </>
    )
}