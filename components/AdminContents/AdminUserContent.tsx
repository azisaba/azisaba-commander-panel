import {UserProfile} from "./UserProfile";
import {UserPermissions} from "./UserPermissions";

export function AdminUserContent(props: { user: User }) {

    return (
        <>
            <UserProfile
                user={props.user}
            />
            <UserPermissions
                user={props.user}
            />
        </>
    )
}