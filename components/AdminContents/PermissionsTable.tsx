import {
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import React from "react";
import {Permission} from "./Permission";
import {StyledTableCell} from "../TableUtil";

export function PermissionsTable(props: { permissions: Permission[], reload: VoidFunction }) {
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
                            <Permission permission={value} key={value.id} reload={props.reload}/>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}