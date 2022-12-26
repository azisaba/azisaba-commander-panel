import styles from "../../styles/DashboardForm.module.scss"
import profileStyles from "../../styles/UserProfile.module.scss"
import React, {useState} from "react";
import {stringAvatar} from "../../utils/AvaterUtil";
import {
    Autocomplete,
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import {fetchData} from "../../utils/FetchUnit";
import {useSession} from "next-auth/react";
import {ConfirmDialog} from "../ConfirmDialog";
import {useRouter} from "next/router";

export function UserProfile(props: { user: User }) {
    const {data: session} = useSession()
    const route = useRouter()
    //  state
    const [openGroupEdit, setOpenGroupEdit] = useState(false)
    const [openDeleteUser, setOpenDeleteUser] = useState(false)
    const [user, setUser] = useState(props.user)
    const [group, setGroup] = useState(user.group)

    const handlerGroupEdit = async (event: React.FormEvent) => {
        event.preventDefault()

        const res = await fetchData(
            "users/" + user.id + "/group",
            "POST",
            {
                group: group
            },
            session?.accessToken
        )
        if (!res || res.response_status != 200) {
            return
        }

        setUser((prevState) => ({
            ...prevState,
            group: group
        }))
        setOpenGroupEdit(false)
    }

    const handlerDeleteUser = async () => {
        const res = await fetchData(
            "users/" + user.id,
            "DELETE",
            {},
            session?.accessToken
        )
        if (!res || res.response_status != 200) {
            return
        }

        setOpenDeleteUser(false)

        //  redirect
        await route.replace("/admin/users")
    }


    return (
        <>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1>Profile</h1>
                    <hr/>
                </div>

                <div className={profileStyles.container}>
                    <div className={profileStyles.icon}>
                        <Avatar
                            {...stringAvatar(user.username)}
                            sx={{
                                width: "240px",
                                height: "240px"
                            }}
                        >
                            <p className={profileStyles.icon_name}>{user.username}</p>
                        </Avatar>
                    </div>
                    <div className={profileStyles.profile}>
                        <h1>
                            {user.username}
                        </h1>
                        <h3>ID: {user.id}</h3>
                        <div className={profileStyles.group}>
                            <h3>Group: {user.group}</h3>
                            <Button
                                onClick={() => setOpenGroupEdit(true)}
                            >
                                Edit
                            </Button>
                            {/*Edit Dialog*/}
                            <Dialog
                                open={openGroupEdit}
                                onClose={() => setOpenGroupEdit(false)}
                            >
                                <form onSubmit={handlerGroupEdit}>
                                    <DialogTitle>
                                        Edit group
                                    </DialogTitle>
                                    <DialogContent>
                                        <Autocomplete
                                            options={[
                                                {
                                                    label: 'admin'
                                                },
                                                {
                                                    label: 'user'
                                                }
                                            ]}
                                            onInputChange={(e, newValue) => {
                                                setGroup(newValue);
                                            }}
                                            isOptionEqualToValue={(option, newValue) => {
                                                return option.label === newValue.label;
                                            }}
                                            renderInput={(params) => <TextField {...params} label="Group"/>}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            variant={"outlined"}
                                            onClick={() => setOpenGroupEdit(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type={"submit"}
                                            variant={"contained"}
                                        >
                                            Edit
                                        </Button>
                                    </DialogActions>
                                </form>
                            </Dialog>
                        </div>

                        <div className={profileStyles.delete_user}>
                            <Button
                                variant={"outlined"}
                                color={"error"}
                                onClick={() => setOpenDeleteUser(true)}
                            >
                                DELETE USER
                            </Button>
                            <ConfirmDialog
                                open={openDeleteUser}
                                onClose={() => setOpenDeleteUser(false)}
                                onConfirm={handlerDeleteUser}
                                confirmText={"delete"}
                                confirmColor={"error"}
                            >
                                <DialogContent>
                                    <DialogContentText>
                                        Are you sure to delete this user?
                                    </DialogContentText>
                                </DialogContent>
                            </ConfirmDialog>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}