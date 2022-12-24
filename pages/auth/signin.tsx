import {SignIn} from "../../components/SignIn";
import {GetServerSideProps} from "next";
import {getCsrfToken} from "next-auth/react";

export default function SignInPage(props: { csrfToken: string, error: boolean }) {
    return (
        <>
            <SignIn csrfToken={props.csrfToken} error={props.error} ></SignIn>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {

    const csrfToken = await getCsrfToken(context)
    return {
        props: {
            csrfToken,
            error: !context.query.error
        },
    }
}