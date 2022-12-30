import React, {useEffect, useRef, useState} from "react"
import styles from "../styles/Registration.module.scss"
import {isAlphabetNumber, isAlphabetNumberSymbol} from "../utils/CommonRegex";
import {Box, Button, TextField, Stack, Alert, TextFieldProps} from "@mui/material";
import Link from "next/link";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";

type SignInState = {
    username: string
    password: string
    //  warning message
    warningUsername: boolean
    warningPassword: boolean
    alert: boolean
}

export function SignIn(props: { csrfToken: string, error: boolean }) {
    const {data: session} = useSession()
    const router = useRouter()
    useEffect(() => {
        //  already authorized
        if (session) {
            router.replace('/').then(() => {
            })
        }

    }, [router, session])

    //  state
    const [formState, setFormState] = useState<SignInState>({
        username: "",
        password: "",
        warningUsername: false,
        warningPassword: false,
        alert: false
    })

    //  ref
    const usernameRef = useRef<TextFieldProps>(null)
    const passwordRef = useRef<TextFieldProps>(null)
    const twoFARef = useRef<TextFieldProps>(null)


    function onChangeUsername() {
        setFormState((prevState) => ({
            ...prevState,
            warningUsername: !isAlphabetNumber(usernameRef.current?.value as string, 4, 32)
        }))
    }

    function onChangePassword() {
        setFormState((prevState) => ({
            ...prevState,
            warningPassword: !isAlphabetNumberSymbol(passwordRef.current?.value as string, 8, 100)
        }))
    }

    function handlerSubmit(event: React.FormEvent) {
        //  Validation check
        if (
            !isAlphabetNumber(usernameRef.current?.value as string, 4, 32)
            || !isAlphabetNumber(passwordRef.current?.value as string, 8, 100)
        ) {
            setFormState((prevState) => ({
                ...prevState,
                alert: true
            }))

            event.preventDefault()
            return
        }
    }


    return (
        <>
            <Box
                sx={{
                    width: '470px',
                    // height: '380px',
                    border: 1,
                    borderColor: '#D8D8D8',
                    borderRadius: '10px',
                    mx: 'auto',
                    mt: '10%',
                    // py: '40px'
                }}
            >
                <h3 className={styles.header}>
                    サインイン
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
                            ユーザー名は4文字以上32文字以下、パスワードは8文字以上100文字以下で入力してください。
                        </Alert>
                    }
                </Stack>

                <form
                    method={"post"}
                    action="/api/auth/callback/credentials"
                    onSubmit={handlerSubmit}
                >
                    <div className={styles.input_container}>
                        <input name="csrfToken" type="hidden" defaultValue={props.csrfToken}/>
                        <TextField
                            id={"username"}
                            name={"username"}
                            label={"ユーザー名"}
                            variant={"standard"}
                            inputRef={usernameRef}
                            onChange={onChangeUsername}
                            fullWidth
                            required
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
                            required
                            error={formState.warningPassword}
                            sx={{
                                mb: '20px'
                            }}
                        />
                        <TextField
                            id={"two_fa_token"}
                            name={"two_fa_token"}
                            label={"2段階認証コード(任意)"}
                            variant={"standard"}
                            inputRef={twoFARef}
                            fullWidth
                            sx={{
                                mb: '20px'
                            }}
                        />
                    </div>
                    <div className={styles.button_container}>
                        <Button href={"/"} variant={"outlined"}>
                            キャンセル
                        </Button>
                        <Button type={"submit"} variant={"contained"}>
                            サインイン
                        </Button>
                    </div>
                </form>
            </Box>

            <div className={styles.go_to_register}>
                 {/*eslint-disable-next-line react/no-unescaped-entities */}
                <p>アカウントをまだ作成されてない場合は、<Link href={"/auth/register"} style={{color: "blue"}}>ここ</Link>から登録してください。</p>
            </div>
        </>
    )
}