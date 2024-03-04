// styling
import styles from './styles.module.scss';

// components
import Spring from '@components/Spring';
import {TabsList} from '@mui/base/TabsList';
import {TabPanel} from '@mui/base/TabPanel';
import {Tabs} from '@mui/base/Tabs';
import Fade from '@mui/material/Fade';

// hooks
import {useState} from 'react';
import UserSettings from "@widgets/ProfileWidgets/UserSettings/UserSettings";

const AccountSettings = () => {
    const [activeTab] = useState('profile');

    return (
        <Spring className="card d-flex flex-column card-padded">
            <h3>Account Settings</h3>
            <div className="d-flex flex-column justify-content-between flex-1">
                <Tabs value={activeTab} >
                    <TabsList className={`${styles.tabs_list} tab-nav col-4`} disabled>
                        {/*<TabButton title={width >= 375 ? 'Basic info' : 'Profile'}*/}
                        {/*           onClick={() => setActiveTab('profile')}*/}
                        {/*           active={activeTab === 'profile'}*/}
                        {/*/>*/}
                        {/*<TabButton title={width >= 375 ? 'Avatar' : 'Basic'}*/}
                        {/*           onClick={() => setActiveTab('basic')}*/}
                        {/*           active={activeTab === 'basic'}/>*/}
                    </TabsList>
                    <TabPanel value="profile">
                        <Fade in={activeTab === 'profile'} timeout={400}>
                            <div style={{
                                marginTop:"50px"
                            }}>
                                <UserSettings/>
                            </div>
                        </Fade>
                    </TabPanel>
                    {/*<TabPanel value="basic">*/}
                    {/*    <Fade in={activeTab === 'basic'} timeout={400}>*/}
                    {/*        <div>*/}
                    {/*            <ProfileAvatar/>*/}
                    {/*        </div>*/}
                    {/*    </Fade>*/}
                    {/*</TabPanel>*/}
                </Tabs>
            </div>
        </Spring>
    )
}

export default AccountSettings