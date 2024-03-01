// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import ProfileAvatar from '@widgets/ProfileAvatar';
import ProfileInfo from '@widgets/ProfileInfo';
import ChangePassword from '@widgets/ChangePassword';
import UserSettings from "@widgets/ProfileWidgets/UserSettings";


const widgets = {
    avatar: <ProfileAvatar/>,
    info: <ProfileInfo/>,
    // description: <ProfileDescription/>,
    settings: <UserSettings/>,
    // payments: <PaymentMethod/>,
    // privacy: <PrivacyPolicy/>,
    // notifications_settings: <NotificationsSettings/>,
    // notifications_schedule: <NotificationsSchedule/>,
    password: <ChangePassword/>
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