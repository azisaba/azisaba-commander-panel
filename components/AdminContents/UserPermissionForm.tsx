import {
    Autocomplete,
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, TextField
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {fetchData} from "../../utils/FetchUnit";
import {useSession} from "next-auth/react";

type UserPermissionsTableProps = {
    user: User
    permissions: Permission[]
    reload: VoidFunction
    open: boolean
    onClose: VoidFunction
}

export function UserPermissionForm(props: UserPermissionsTableProps) {
    const {data: session} = useSession()
    //  state
    const [idState, setIdState] = useState<string | undefined>(undefined)
    const [availablePermission, setAvailablePermission] = useState<Permission[]>([])

    useEffect(() => {
        fetchData(
            "permissions",
            "GET",
            {},
            session?.accessToken
        ).then(res => {
            if(!res || res.response_status != 200) {
                return
            }

            setAvailablePermission(res.permissions)
        })
    }, [session])

    const addPermission = async () => {
        if (!idState) {
            return
        }

        const res = await fetchData(
            "users/"+ props.user.id +"/permissions/"+idState,
            "POST",
            {},
            session?.accessToken
        )

        if (!res || res.response_status != 200) {
            console.log("Failed to add permission")
            return
        }

        props.onClose()
        await props.reload()
    }

    return (
        <>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                maxWidth={"sm"}
                fullWidth
            >
                <DialogTitle>
                    Add user permission
                </DialogTitle>
                <DialogContent>
                    <Autocomplete
                        sx={{
                            mt: "20px"
                        }}
                        options={availablePermission}
                        filterOptions={(options) => {
                            return options.filter(value => {
                                for (const permission of props.permissions)
                                {
                                    if (permission.id == value.id)
                                    {
                                        return false
                                    }
                                }
                                return true
                            })
                        }}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) => {
                            return option.id == value.id
                        }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Choose a permission"
                            />
                        }
                        onChange={(event, value) => {
                            if(value) {
                                setIdState(value.id)
                            }
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
                        onClick={addPermission}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}