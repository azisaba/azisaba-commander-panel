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
                result: "Server is down now"
            }))
            return
        }
        if (res != 200) {
            //  show error message
            setFormState((prevState) => ({
                ...prevState,
                result: res.error
            }))
            return
        }

        //  redirect
        router.replace('/auth/signin').then()
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
                Registration
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
                        You need to fill out all input fields.<br/>
                        You can use alphanumeric and characters.
                        Username must be more longer than 4. Password must be more than 8.<br/>
                        Also, Password and Confirm Password must be correctly matched.
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
                    label={"Username"}
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
                    label={"Password"}
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
                    label={"Confirm Password"}
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
                    Cancel
                </Button>
                <Button onClick={handlerSubmit} variant={"contained"}>
                    Register
                </Button>
            </div>
        </Box>
    )

}