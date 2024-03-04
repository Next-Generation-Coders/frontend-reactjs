// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import UserSettings from "@widgets/ProfileWidgets/UserSettings";
import UserPassword from "@widgets/ProfileWidgets/UserPassword/UserPassword";
import UserInfo from "@widgets/ProfileWidgets/UserInfo";
import UserAvatar from "@widgets/ProfileWidgets/UserAvatar";


const widgets = {
    avatar: <UserAvatar/>,
    info: <UserInfo/>,
    settings: <UserSettings/>,
    password: <UserPassword/>
}

const Profile = () => {
    return (
        <>
            <PageHeader title="Settings" />
            <AppGrid id="profile" widgets={widgets}/>
        </>
    )
}

export default Profile