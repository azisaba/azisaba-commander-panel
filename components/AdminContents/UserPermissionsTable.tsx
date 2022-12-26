import {Paper, Table, TableBody, TableContainer, TableHead, TableRow} from "@mui/material";
import {StyledTableCell} from "../TableUtil";
import {Permission} from "./Permission";
import React from "react";
import {UserPermission} from "./UserPermission";

type UserPermissionsTableProps = {
    user: User
    permissions: Permission[]
    reload: VoidFunction
}

export function UserPermissionsTable(props: UserPermissionsTableProps) {


    return (
        <>
            <TableContainer
                component={Paper}
                sx={{
                    mt: "20px"
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align={"left"}>ID</StyledTableCell>
                            <StyledTableCell align={"left"}>Name</StyledTableCell>
                            <StyledTableCell align={"center"}>Content(Project -{">"} Service)</StyledTableCell>
                            <StyledTableCell align={"right"}>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.permissions.map((value) => (
                            <UserPermission
                                user={props.user}
                                permission={value}
                                key={value.id}
                                reload={props.reload}
                            />
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}