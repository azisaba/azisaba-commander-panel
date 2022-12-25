import {ChangePasswordForm} from "./ChangePasswordForm";
import {fetchData} from "../../utils/FetchUnit";
import {useSession} from "next-auth/react";

export function AdminAccountContent() {

    const {data: session} = useSession()
    fetchData(
        "me",
        "GET",
        {},
        session?.accessToken
    ).then(res => {
        console.log(res)
    })

    return (
        <>
            <ChangePasswordForm />
        </>
    )
}