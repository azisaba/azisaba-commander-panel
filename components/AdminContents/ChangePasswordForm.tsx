import styles from "../../styles/DashboardForm.module.scss"
import {useSession} from "next-auth/react";
import React, {useRef, useState} from "react";
import {Alert, Button, Stack, TextField, TextFieldProps} from "@mui/material";
import {isAlphabetNumber, isAlphabetNumberSymbol} from "../../utils/CommonRegex";
import {fetchData} from "../../utils/FetchUnit";

type ChangePasswordFormState = {
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string,
    warningOldPassword: boolean,
    warningNewPassword: boolean,
    warningConfirmNewPassword: boolean,
    twoFAToken?: string,
    result?: string
}

export function ChangePasswordForm() {
    const {data: session} = useSession()
    //  state
    const [formState, setFormState] = useState<ChangePasswordFormState>({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        warningOldPassword: false,
        warningNewPassword: false,
        warningConfirmNewPassword: false,
        twoFAToken: undefined,
        result: undefined
    })

    //  ref
    const oldPasswordRef = useRef<TextFieldProps>(null)
    const newPasswordRef = useRef<TextFieldProps>(null)
    const confirmNewPasswordRef = useRef<TextFieldProps>(null)
    const twoFATokenRef = useRef<TextFieldProps>(null)

    //  handlers
    function onChangeOldPassword() {
        setFormState((prevState) => ({
            ...prevState,
            warningOldPassword: !isAlphabetNumber(oldPasswordRef.current?.value as string, 8, 100)
        }))
    }

    function onChangeNewPassword() {
        setFormState((prevState) => ({
            ...prevState,
            warningNewPassword: !isAlphabetNumber(newPasswordRef.current?.value as string, 8, 100)
        }))

        //  confirm
        setFormState((prevState) => ({
            ...prevState,
            warningConfirmNewPassword: !isAlphabetNumberSymbol(newPasswordRef.current?.value as string, 8, 100)
                || (confirmNewPasswordRef.current?.value != newPasswordRef.current?.value)
        }))
    }

    function onChangeConfirmNewPassword() {
        setFormState((prevState) => ({
            ...prevState,
            warningConfirmNewPassword: !isAlphabetNumberSymbol(confirmNewPasswordRef.current?.value as string, 8, 100)
                || (confirmNewPasswordRef.current?.value != newPasswordRef.current?.value)
        }))
    }

    async function handlerSubmit(event: React.FormEvent) {
        event.preventDefault()

        //  Validation check
        if (
            !isAlphabetNumber(oldPasswordRef.current?.value as string, 8, 100)
            || !isAlphabetNumber(newPasswordRef.current?.value as string, 8, 100)
            || !isAlphabetNumber(confirmNewPasswordRef.current?.value as string, 8, 100)
            || newPasswordRef.current?.value != confirmNewPasswordRef.current?.value
        ) {
            return
        }

        //  Post
        const res = await fetchData(
            'changepassword',
            "POST",
            {
                'old': oldPasswordRef.current?.value,
                'new': newPasswordRef.current?.value,
                'code': twoFATokenRef.current?.value
            },
            session?.accessToken
        )

        //  server is down
        if (!res) {
            setFormState((prevState) => ({
                ...prevState,
                result: "サーバーがダウンしています。"
            }))
            return
        }

        if (res.response_status != 200) {
            setFormState((prevState) => ({
                ...prevState,
                result: res.error
            }))
            return
        }

        setFormState((prevState) => ({
            ...prevState,
            result: "パスワードの変更に成功しました！"
        }))
    }


    return (
        <>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1>パスワード変更</h1>
                    <hr/>
                </div>

                <Stack
                    sx={{
                        width: '50%',
                    }}
                >
                    {formState.result &&
                        <Alert
                            severity={"info"}
                        >
                            {formState.result}
                        </Alert>
                    }
                </Stack>
                <form onSubmit={handlerSubmit}>
                    <p>
                        パスワードは半角英数字記号で、8文字以上100文字以下で設定できます。
                    </p>
                    <div className={styles.inputs}>
                        <TextField
                            id={"old_password"}
                            name={"old_password"}
                            label={"古いパスワード"}
                            type={"password"}
                            variant={"standard"}
                            inputRef={oldPasswordRef}
                            onChange={onChangeOldPassword}
                            fullWidth
                            error={formState.warningOldPassword}
                            sx={{
                                mb: '20px'
                            }}
                        />
                        <TextField
                            id={"new_password"}
                            name={"new_password"}
                            label={"新しいパスワード"}
                            type={"password"}
                            variant={"standard"}
                            inputRef={newPasswordRef}
                            onChange={onChangeNewPassword}
                            fullWidth
                            error={formState.warningNewPassword}
                            sx={{
                                mb: '20px'
                            }}
                        />
                        <TextField
                            id={"confirm_new_password"}
                            name={"confirm_new_password"}
                            label={"新しいパスワード(確認)"}
                            type={"password"}
                            variant={"standard"}
                            inputRef={confirmNewPasswordRef}
                            onChange={onChangeConfirmNewPassword}
                            fullWidth
                            error={formState.warningConfirmNewPassword}
                            sx={{
                                mb: '20px'
                            }}
                        />
                        <TextField
                            id={"two_fa"}
                            name={"two_fa"}
                            label={"2段階認証コード(任意)"}
                            variant={"standard"}
                            inputRef={twoFATokenRef}
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
                        変更
                    </Button>
                </form>
            </div>
        </>
    )


}