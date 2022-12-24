import type {NextPage} from 'next'
import {Header} from "../components/Header";
import {useSession} from "next-auth/react";

const Home: NextPage = () => {
    const {data: session} = useSession()

    return (
        <>
            <Header/>
            {/*<Registration/>*/}
            {!session ?
                "unauthorized" :
                session.user.name
            }
        </>
    )
}

export default Home
