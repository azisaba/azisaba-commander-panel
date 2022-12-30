import {useSession} from "next-auth/react";
import React, {useRef, useState} from "react";
import {Alert, Button, Stack, TextField, TextFieldProps} from "@mui/material";
import {fetchData} from "../../utils/FetchUnit";
import styles from "../../styles/DashboardForm.module.scss";

export function TwoFADisableForm() {
    const {data: session} = useSession()
    //  state
    const [resultState, setResultState] = useState<string | undefined>(undefined)
    //  ref
    const codeRef = useRef<TextFieldProps>(null)

    const handlerSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        const res = await fetchData(
            '2fa',
            "DELETE",
            {
                code: codeRef.current?.value
            },
            session?.accessToken
        )

        if (!res) {
            setResultState("サーバーがダウンしています。")
            return
        }

        if (res.response_status != 200) {
            setResultState(res.error)
            return
        }

        setResultState("2段階認証を無効化しました。")
    }

    return (
        <>
            <Stack
                sx={{
                    width: '50%',
                }}
            >
                {resultState &&
                    <Alert
                        severity={"info"}
                    >
                        {resultState}
                    </Alert>
                }
            </Stack>
            <form onSubmit={handlerSubmit}>
                <p>2段階認証の無効化</p>
                <div className={styles.inputs}>
                    <TextField
                        id={"two_fa_disable"}
                        name={"two_fa"}
                        label={"2段階認証コード(リカバリーコード)"}
                        variant={"standard"}
                        inputRef={codeRef}
                        fullWidth
                        sx={{
                            mb: '20px'
                        }}
                    />
                </div>
                <Button
                    type={"submit"}
                    variant={"contained"}
                    className={styles.submit}
                >
                    無効化
                </Button>
            </form>
        </>
    )
}