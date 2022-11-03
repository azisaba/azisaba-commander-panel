import React from "react"
import styles from "../styles/Registration.module.scss"
import {SingleLineInput} from "./SingleLineInput"
import {ClickableButton} from "./ClickableButton"
import {AccessibleButton} from "./AccessibleButton"
import {isAlphabetNumber, isAlphabetNumberSymbol} from "../utils/CommonRegex";

type RegistrationForm = {
    username: string
    password: string
    confirmPassword: string
    //  warning message
    warningUsername: boolean
    warningPassword: boolean
    warningConfirmPassword: boolean
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
            warningConfirmPassword: false
        }

        //  bind handlers
        this.handlerSubmit = this.handlerSubmit.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this)
    }


    onChangeUsername(value: string) {
        this.setState({
            username: value,
            warningUsername: !isAlphabetNumber(value, 4, 32)
        })
    }

    onChangePassword(value: string) {
        this.setState({
            password: value,
            warningPassword: !isAlphabetNumberSymbol(value, 8, 100)
        })
    }

    onChangeConfirmPassword(value: string) {
        this.setState({
            confirmPassword: value,
            warningConfirmPassword: this.state.password != value
        })
    }

    handlerSubmit() {
        //  Validation check
        if(!isAlphabetNumber(this.state.username, 4, 32)) {

        }
        //  Post with AJax

        //  redirect with param
    }


    render() {
        return (
            <form className={styles.form_container}>
                <h3>
                    Registration
                </h3>

                <div className={styles.input_container}>
                    <SingleLineInput
                        type={"Username"}
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        message={this.state.warningUsername && <span style={{color: "red"}}>❌Invalid username</span>}
                    />
                    <SingleLineInput
                        type={"Password"}
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        blind={true}
                        message={this.state.warningPassword && <span style={{color: "red"}}>❌Invalid password</span>}
                    />
                    <SingleLineInput
                        type={"Confirm Password"}
                        value={this.state.confirmPassword}
                        onChange={this.onChangeConfirmPassword}
                        blind={true}
                        message={this.state.warningConfirmPassword && <span style={{color: "red"}}>❌No match</span>}
                    />
                </div>

                <div className={styles.button_container}>
                    <AccessibleButton href={"/"} value={"Cancel"} />
                    <ClickableButton onClick={this.handlerSubmit} value={"Register"} color={"#92B4F2"} />
                </div>
            </form>
        )
    }
}