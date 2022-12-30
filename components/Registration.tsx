import React, {useEffect, useRef, useState} from "react"
import styles from "../styles/Registration.module.scss"
import {isAlphabetNumber, isAlphabetNumberSymbol} from "../utils/CommonRegex";
import {Box, Button, TextField, Stack, Alert, TextFieldProps} from "@mui/material";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {fetchData} from "../utils/FetchUnit";

type RegistrationForm = {
    username: string
    password: string
    confirmPassword: string
    //  warning message
    warningUsername: boolean
    warningPassword: boolean
    warningConfirmPassword: boolean
    alert: boolean
    result?: string
}

export function Registration() {
    //  redirect if user already authorized or waiting to finish registration
    const {data: session} = useSession()
    const router = useRouter()

    useEffect(() => {
        //  finish registration
        if (router.query.state) {
            (async () => {
                //  post
                await fetchData(
                    'register/'+router.query.state,
                    'GET'
                )
                //  redirect
                await router.replace('/auth/signin')
            })()

        }
    }, [router])

    useEffect(() => {
        //  already authorized
        if (session) {
            router.replace('/').then(() => {
            })
        }

    }, [router, session])

    //  state
    const [formState, setFormState] = useState<RegistrationForm>(
        {
            username: "",
            password: "",
            confirmPassword: "",
            warningUsername: false,
            warningPassword: false,
            warningConfirmPassword: false,
            alert: false,
            result: undefined
        }
    )

    //  ref
    const usernameRef = useRef<TextFieldProps>(null)
    const passwordRef = useRef<TextFieldProps>(null)
    const confirmPasswordRef = useRef<TextFieldProps>(null)

    function onChangeUsername() {
        setFormState((prevState) => ({
            ...prevState,
            warningUsername: !isAlphabetNumber(usernameRef.current?.value as string, 4, 32)
        }))
    }

    function onChangePassword() {
        setFormState((prevState) => ({
            ...prevState,
            warningPassword: !isAlphabetNumber(passwordRef.current?.value as string, 8, 100)
        }))

        //  confirm
        setFormState((prevState) => ({
            ...prevState,
            warningConfirmPassword: !isAlphabetNumberSymbol(passwordRef.current?.value as string, 8, 100)
                || (confirmPasswordRef.current?.value != passwordRef.current?.value)
        }))
    }

    function onChangeConfirmPassword() {
        setFormState((prevState) => ({
            ...prevState,
            warningConfirmPassword: !isAlphabetNumberSymbol(confirmPasswordRef.current?.value as string, 8, 100)
                || (confirmPasswordRef.current?.value != passwordRef.current?.value)
        }))
    }

    async function handlerSubmit() {
        //  Validation check
        if (
            !isAlphabetNumber(usernameRef.current?.value as string, 4, 32)
            || !isAlphabetNumber(passwordRef.current?.value as string, 8, 100)
            || !isAlphabetNumber(confirmPasswordRef.current?.value as string, 8, 100)
            || passwordRef.current?.value != confirmPasswordRef.current?.value
        ) {
            setFormState((prevState) => ({
                ...prevState,
                alert: true
            }))
            return
        }

        //  Post
        const res = await fetchData(
            'register',
            'POST',
            {
                username: usernameRef.current?.value as string,
                password: passwordRef.current?.value as string
            }
        )

        if (!res) {
            setFormState((prevState) => ({
                ...prevState,
                result: "サーバーがダウンしています"
            }))
            return
        }
        if (res.response_status != 200) {
            //  show error message
            setFormState((prevState) => ({
                ...prevState,
                result: res.error
            }))
            return
        }

        //  redirect
        router.replace("/auth/signin").then()
    }

    return (
        <Box
            sx={{
                width: '470px',
                // height: '380px',
                border: 1,
                borderColor: '#D8D8D8',
                borderRadius: '10px',
                mx: 'auto',
                my: '10%',
                // py: '40px'
            }}
        >
            <h3 className={styles.header}>
                登録
            </h3>

            <Stack
                sx={{
                    width: '80%',
                    mx: 'auto'
                }}
            >
                {formState.alert &&
                    <Alert
                        severity={"error"}
                        sx={{
                            mb: '20px'
                        }}
                    >
                        ユーザー名は半角英数字、パスワードは半角英数字記号が使えます。<br/>
                        ユーザー名は4文字以上32文字以下、パスワードは8文字以上100文字以下で設定できます。
                    </Alert>
                }
                {formState.result &&
                    <Alert
                        severity={"error"}
                        sx={{
                            mb: '20px'
                        }}
                    >
                        {formState.result}
                    </Alert>
                }
            </Stack>

            <div className={styles.input_container}>
                <TextField
                    id={"username"}
                    name={"username"}
                    label={"ユーザー名"}
                    variant={"standard"}
                    inputRef={usernameRef}
                    onChange={onChangeUsername}
                    fullWidth
                    error={formState.warningUsername}
                    sx={{
                        mb: '20px'
                    }}
                />
                <TextField
                    id={"password"}
                    name={"password"}
                    label={"パスワード"}
                    type={"password"}
                    variant={"standard"}
                    inputRef={passwordRef}
                    onChange={onChangePassword}
                    fullWidth
                    error={formState.warningPassword}
                    sx={{
                        mb: '20px'
                    }}
                />
                <TextField
                    id={"confirm_password"}
                    name={"confirm_password"}
                    label={"パスワード(確認)"}
                    type={"password"}
                    variant={"standard"}
                    inputRef={confirmPasswordRef}
                    onChange={onChangeConfirmPassword}
                    fullWidth
                    error={formState.warningConfirmPassword}
                    sx={{
                        mb: '20px'
                    }}
                />
            </div>
            <div className={styles.button_container}>
                <Button href={"/"} variant={"outlined"}>
                    キャンセル
                </Button>
                <Button onClick={handlerSubmit} variant={"contained"}>
                    登録
                </Button>
            </div>
        </Box>
    )

}