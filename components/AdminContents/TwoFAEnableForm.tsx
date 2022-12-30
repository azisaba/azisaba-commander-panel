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
                result: "サーバーがダウンしています。"
            }))
        }

        if (res.response_status != 200) {
            setState((prevState) => ({
                ...prevState,
                result: "2段階認証の有効化に失敗しました。"
            }))
        }

        setState((prevState) => ({
            ...prevState,
            result: "2段階認証を有効化しました。",
            success: true,
            url: res.url,
            recovery: res.recoveryCodes
        }))
    }

    return (
        <>
            {!state.success &&
                <>
                    <p>２段階認証の有効化</p>
                    <Button
                        variant={"contained"}
                        onClick={onClick}
                    >
                        有効化
                    </Button>
                </>
            }
            {state.success &&
                <>
                    <p style={{
                        color: "red",
                        fontWeight: "bold"
                    }}>
                        必ずスマートホン、その他の端末で以下のQRコードを読み取り設定を行ってください。<br/>
                        これ以降表示されません！
                    </p>
                    <QRCode
                        value={state.url ?? "サポートされていません。"}
                        size={256}
                    />
                    <br/>
                    <p>
                        リカバリーコード
                    </p>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            mb: "20px"
                        }}
                    >
                        {state.recovery?.map((value, index) => (<Grid item xs={2} key={index}>{value}</Grid>))}
                    </Grid>
                </>
            }
        </>

    )
}