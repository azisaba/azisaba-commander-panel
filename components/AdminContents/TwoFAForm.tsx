import styles from "../../styles/DashboardForm.module.scss"
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {fetchData} from "../../utils/FetchUnit";
import {TwoFADisableForm} from "./TwoFADisableForm";
import {TwoFAEnableForm} from "./TwoFAEnableForm";

export function TwoFASection() {
    const {data: session} = useSession()
    //  state
    const [state, setState] = useState<boolean | undefined>(undefined)

    //  fetch
    useEffect(() => {
        fetchData(
            'me',
            'GET',
            {},
            session?.accessToken
        ).then(res => {
            if(!res || res.response_status != 200 || res['2fa']) {
                return
            }

            setState(res['2fa'] as boolean)
        })
    }, [session])

    let content;
    if (!state) {
        content = "Loading..."
    }
    if(state) {
        content = <TwoFADisableForm />
    }
    else {
        content = <TwoFAEnableForm />
    }

    return (
        <>
            <div className={styles.content} >
                <div className={styles.title}>
                    <h1>2FA settings</h1>
                    <hr/>
                </div>
                {content}
            </div>
        </>
    )
}