import React, {useRef, useState} from "react"
import styles from "../styles/Registration.module.scss"
import {isAlphabetNumber, isAlphabetNumberSymbol} from "../utils/CommonRegex";
import {Box, Button, TextField, Stack, Alert, TextFieldProps} from "@mui/material";

type SignInState = {
    username: string
    password: string
    //  warning message
    warningUsername: boolean
    warningPassword: boolean
    alert: boolean
}

export function SignIn(props: { csrfToken: string }) {
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
                Sign in
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
                        Username must be more longer than 4. Password must be more than 8.
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
                        id={"two_fa_token"}
                        name={"two_fa_token"}
                        label={"2FA token (optional)"}
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
                        Cancel
                    </Button>
                    <Button type={"submit"} variant={"contained"}>
                        Sign In
                    </Button>
                </div>
            </form>
        </Box>
    )
}