import styles from "../../styles/DashboardForm.module.scss"
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {fetchData} from "../../utils/FetchUnit";
import {TwoFADisableForm} from "./TwoFADisableForm";
import {TwoFAEnableForm} from "./TwoFAEnableForm";

type TwoFASectionState = {
    loading: boolean
    enabled: boolean
}

export function TwoFASection() {
    const {data: session} = useSession()
    //  state
    const [state, setState] = useState<TwoFASectionState>({
        loading: true,
        enabled: false
    })

    //  fetch
    useEffect(() => {
        fetchData(
            'me',
            'GET',
            {},
            session?.accessToken
        ).then(res => {
            if(!res || res.response_status != 200) {
                return
            }

            setState(() => ({
                loading: false,
                enabled: res['2fa'] as boolean
            }))
        })
    }, [session])

    let content;
    if(state.enabled) {
        content = <TwoFADisableForm />
    }
    else {
        content = <TwoFAEnableForm />
    }

    return (
        <>
            <div className={styles.content} >
                <div className={styles.title}>
                    <h1>2段階認証設定</h1>
                    <hr/>
                </div>
                {state.loading ?
                    "Loading...":
                    content
                }
            </div>
        </>
    )
}