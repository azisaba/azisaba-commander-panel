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
            setResultState("Sorry. Server is down now.")
            return
        }

        if (res.response_status != 200) {
            setResultState(res.error)
            return
        }

        setResultState("Success!")
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
                <div className={styles.inputs}>
                    <TextField
                        id={"two_fa"}
                        name={"two_fa"}
                        label={"2FA Token"}
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
                    Change
                </Button>
            </form>
        </>
    )
}