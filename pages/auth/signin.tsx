import {SignIn} from "../../components/SignIn";
import {GetServerSideProps} from "next";
import {getCsrfToken} from "next-auth/react";

export default function SignInPage(props: { csrfToken: string }) {
    return (
        <>
            <SignIn csrfToken={props.csrfToken} ></SignIn>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const csrfToken = await getCsrfToken(context)
    return {
        props: {
            csrfToken
        },
    }
}