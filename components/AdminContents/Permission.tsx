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
            console.log("パーミッションの削除に失敗しました。")
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
                        編集
                    </Button>
                    <Button
                        size={"small"}
                        onClick={() => setOpenDelete(true)}
                    >
                        削除
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
                confirmText={"削除"}
                confirmColor={"warning"}
            >
                <DialogTitle>
                    &quot;{props.permission.name}&quot;を削除
                </DialogTitle>
                <DialogContent>
                    本当に&quot;{props.permission.name}&quot;を削除しますか?<br/>
                    この操作は、復元できません。
                </DialogContent>
            </ConfirmDialog>

        </>
    )
}