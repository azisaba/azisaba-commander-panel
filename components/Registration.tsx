import React from "react"
import styles from "../styles/Registration.module.scss"
import {isAlphabetNumber, isAlphabetNumberSymbol} from "../utils/CommonRegex";
import {Box, Button, TextField, Stack, Alert} from "@mui/material";

type RegistrationForm = {
    username: string
    password: string
    confirmPassword: string
    //  warning message
    warningUsername: boolean
    warningPassword: boolean
    warningConfirmPassword: boolean
    alert: boolean
}

export class Registration extends React.Component<any, RegistrationForm> {

    constructor(props: any) {
        super(props)

        //  init state
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            warningUsername: false,
            warningPassword: false,
            warningConfirmPassword: false,
            alert: false
        }

        //  bind handlers
        this.handlerSubmit = this.handlerSubmit.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this)
    }


    onChangeUsername(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        this.setState({
            username: event.target.value,
            warningUsername: !isAlphabetNumber(event.target.value, 4, 32)
        })
    }

    onChangePassword(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        this.setState({
            password: event.target.value,
            warningPassword: !isAlphabetNumberSymbol(event.target.value, 8, 100)
        })

        //  confirm
        this.setState({
            warningConfirmPassword: !isAlphabetNumberSymbol(event.target.value, 8, 100)
                || (this.state.confirmPassword != event.target.value)
        })
    }

    onChangeConfirmPassword(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        this.setState({
            confirmPassword: event.target.value,
            warningConfirmPassword: !isAlphabetNumberSymbol(event.target.value, 8, 100)
                || (this.state.password != event.target.value)
        })
    }

    handlerSubmit() {
        //  Validation check
        if (
            !isAlphabetNumber(this.state.username, 4, 32)
            || !isAlphabetNumber(this.state.password, 8, 100)
            || !isAlphabetNumber(this.state.confirmPassword, 8, 100)
            || this.state.password != this.state.confirmPassword
        ) {
            this.setState({
                alert: true
            })
            return
        }
        //  Post with AJax

        //  redirect with param
    }


    render() {
        return (
            <Box
                component="form"
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
                    {this.state.alert &&
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
                </Stack>

                <div className={styles.input_container}>
                    <TextField
                        id={"username_input"}
                        label={"Username"}
                        defaultValue={this.state.username}
                        variant={"standard"}
                        onChange={this.onChangeUsername}
                        fullWidth
                        error={this.state.warningUsername}
                        sx={{
                            mb: '20px'
                        }}
                    />
                    <TextField
                        id={"password_input"}
                        label={"Password"}
                        defaultValue={this.state.username}
                        variant={"standard"}
                        onChange={this.onChangePassword}
                        fullWidth
                        error={this.state.warningPassword}
                        sx={{
                            mb: '20px'
                        }}
                    />
                    <TextField
                        id={"confirm_password_input"}
                        label={"Confirm Password"}
                        defaultValue={this.state.username}
                        variant={"standard"}
                        onChange={this.onChangeConfirmPassword}
                        fullWidth
                        error={this.state.warningConfirmPassword}
                        sx={{
                            mb: '20px'
                        }}
                    />
                </div>
                <div className={styles.button_container}>
                    <Button href={"/"} variant={"outlined"}>
                        Cancel
                    </Button>
                    <Button onClick={this.handlerSubmit} variant={"contained"}>
                        Register
                    </Button>
                </div>
            </Box>
        )
    }
}