import {StyledTableCell, StyledTableRow} from "../TableUtil";
import {Button} from "@mui/material";
import React, {useState} from "react";
import {PermissionContentDialog} from "./PermissionContentDialog";

type PermissionContentProps = {
    id: number
    content: PermissionContent
    onUpdate: (index: number, project: string, service: string) => boolean
    onDelete: (index: number) => void
}
export function PermissionContent(props: PermissionContentProps) {
    //  state
    const [openEdit, setOpenEdit] = useState(false)

    //  ref
    return (
        <>
            <StyledTableRow>
                <StyledTableCell >{props.content.project}</StyledTableCell>
                <StyledTableCell >{props.content.service}</StyledTableCell>
                <StyledTableCell align={"right"}>
                    <Button
                        size={"small"}
                        onClick={() => setOpenEdit(true)}
                    >
                        Edit
                    </Button>
                    <Button
                        size={"small"}
                        onClick={() => props.onDelete(props.id)}
                    >
                        Delete
                    </Button>
                </StyledTableCell>
            </StyledTableRow>
            <PermissionContentDialog
                method={"EDIT"}
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                id={props.id}
                content={props.content}
                onUpdate={props.onUpdate}
            />
        </>
    )
}