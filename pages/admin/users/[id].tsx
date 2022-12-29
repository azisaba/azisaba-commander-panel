import type {NextPage} from 'next'
import {Header} from "../../../components/Header";
import {AdminDashboard} from "../../../components/AdminContents/AdminDashboard";
import {useSession} from "next-auth/react";
import {AdminUserContent} from "../../../components/AdminContents/AdminUserContent";
import {useEffect, useState} from "react";
import {fetchData} from "../../../utils/FetchUnit";
import {useRouter} from "next/router";

const UserPage: NextPage = () => {
    const {data: session, status} = useSession({required: true})
    //  state
    const [userState, setUserState] = useState<User | undefined>(undefined)
    const [isLoading, setLoading] = useState(true)
    //  router
    const router = useRouter()
    const {id} = router.query

    useEffect(() => {
        if(!session || !id) {
            return
        }

        fetchData(
            "users/" + id,
            "GET",
            {},
            session?.accessToken
        ).then(res => {

            if (!res || res.response_status != 200) {
                return
            }
            const {response_status, ...rest} = res

            setUserState(rest)
            setLoading(false)
        })
    }, [id, session])

    if (status == 'loading') {
        return (
            <>
                <Header/>
                <p>you need to sign in...</p>
            </>
        )
    }
    if (session?.user.group != "admin") {
        return (
            <>
                <Header/>
                <p>forbidden</p>
            </>
        )
    }

    return (
        <>
            <div style={{
                display: "flex",
                height: "100vh",
                flexDirection: "column"
            }}>
                <Header/>
                <AdminDashboard>
                    {!isLoading &&
                        <AdminUserContent user={userState as User}/>
                    }
                </AdminDashboard>
            </div>
        </>
    )
}

export default UserPage