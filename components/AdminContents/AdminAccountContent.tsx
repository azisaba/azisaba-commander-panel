import {ChangePasswordForm} from "./ChangePasswordForm";
import {TwoFASection} from "./TwoFAForm";

export function AdminAccountContent() {

    return (
        <>
            <ChangePasswordForm />
            <TwoFASection />
        </>
    )
}