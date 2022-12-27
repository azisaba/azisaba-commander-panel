import type {NextPage} from 'next'
import {Header} from "../components/Header";
import {ContainersPanel} from "../components/Containers/ContainersPanel";
import {useSession} from "next-auth/react";

const Home: NextPage = () => {
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
                <ContainersPanel/>
            </div>
        </>
    )
}

export default Home
