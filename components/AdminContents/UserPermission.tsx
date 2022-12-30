import {
    Button,
    Stack,
} from "@mui/material";
import React from "react";
import {StyledTableCell, StyledTableRow} from "../TableUtil";
import {useSession} from "next-auth/react";
import {fetchData} from "../../utils/FetchUnit";

export function UserPermission(props: {user: User, permission: Permission, reload: VoidFunction}) {
    const {data: session} = useSession()

    const deletePermission = async () => {
        const res = await fetchData(
            "users/"+ props.user.id +"/permissions/"+props.permission.id,
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
                        onClick={deletePermission}
                    >
                        削除
                    </Button>
                </StyledTableCell>
            </StyledTableRow>

        </>
    )
}