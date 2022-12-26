import type {NextPage} from 'next'
import {Header} from "../../components/Header";
import {AdminDashboard} from "../../components/AdminContents/AdminDashboard";
import {useSession} from "next-auth/react";
import {AdminAccountContent} from "../../components/AdminContents/AdminAccountContent";

const AdminPage: NextPage = () => {
    const {status} = useSession({required: true})
    if (status == 'loading') {
        return (
            <>
                <Header/>
                <p>you need to sign in...</p>
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
                    <AdminAccountContent/>
                </AdminDashboard>
            </div>
        </>
    )
}

export default AdminPage
