import type {NextPage} from 'next'
import {Header} from "../../components/Header";
import {AdminDashboard} from "../../components/AdminContents/AdminDashboard";
import {useSession} from "next-auth/react";
import {AdminPermissionsContent} from "../../components/AdminContents/AdminPermissionsContent";

const AdminPage: NextPage = () => {
    const {data: session, status} = useSession({required: true})
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
                    <AdminPermissionsContent />
                </AdminDashboard>
            </div>
        </>
    )
}

export default AdminPage
