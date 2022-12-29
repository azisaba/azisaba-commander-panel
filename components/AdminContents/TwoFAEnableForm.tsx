import {useSession} from "next-auth/react";
import {Button, Grid} from "@mui/material";
import {useState} from "react";
import {fetchData} from "../../utils/FetchUnit";
import QRCode from "react-qr-code"

type TwoFAEnableFormState = {
    result?: string
    success: boolean
    url?: string
    recovery?: string[]
}

export function TwoFAEnableForm() {
    const {data: session} = useSession()
    //  state
    const [state, setState] = useState<TwoFAEnableFormState>({
        result: undefined,
        success: false,
        url: undefined,
        recovery: undefined
    })

    const onClick = async () => {
        const res = await fetchData(
            "2fa",
            "POST",
            {},
            session?.accessToken
        )

        if (!res) {
            setState((prevState) => ({
                ...prevState,
                result: "Sorry. Server is down now."
            }))
        }

        if (res.response_status != 200) {
            setState((prevState) => ({
                ...prevState,
                result: "Failed to enable 2fa."
            }))
        }

        setState((prevState) => ({
            ...prevState,
            result: "Success!",
            success: true,
            url: res.url,
            recovery: res.recoveryCodes
        }))
    }

    return (
        <>
            {!state.success &&
                <>
                    <p>Enable 2FA</p>
                    <Button
                        variant={"contained"}
                        onClick={onClick}
                    >
                        enable
                    </Button>
                </>
            }
            {state.success &&
                <>
                    <p>Please set up secret on your authorization.</p>
                    <QRCode
                        value={state.url ?? "Not support"}
                        size={256}
                    />
                    <Grid container spacing={2}>
                        {state.recovery?.map((value, index) => (<Grid item xs={2} key={index}>{value}</Grid>))}
                    </Grid>
                </>
            }
        </>

    )
}