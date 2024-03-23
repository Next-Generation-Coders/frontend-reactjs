// styling
import styles from './styles.module.scss';

// components
import Spring from '@components/Spring';
import {TabsList} from '@mui/base/TabsList';
import {TabPanel} from '@mui/base/TabPanel';
import {Tabs} from '@mui/base/Tabs';
import TabButton from '@ui/TabButton';
import Fade from '@mui/material/Fade';
import BlockedUsers from "@widgets/UserManagement/BlockedUsers";

// hooks
import { useState} from 'react';
import { useWindowSize} from 'react-use';
import ActiveUsers from "@widgets/UserManagement/ActiveUsers";

const DisplayUsers = () => {
    const [activeTab, setActiveTab] = useState('blocked');
    const {width} = useWindowSize();

    return (
        <Spring className="card d-flex flex-column card-padded">
            <div className="d-flex flex-column justify-content-between flex-1">
                <Tabs value={activeTab}>
                    <TabsList className={`${styles.tabs_list} tab-nav col-2`}>
                        <TabButton title={width >= 375 ? 'Active users' : 'Active'}
                                   onClick={() => setActiveTab('blocked')}
                                   active={activeTab === 'blocked'}/>
                        <TabButton title={width >= 375 ? 'Blocked Users' : 'Blocked'}
                                   onClick={() => setActiveTab('basic')}
                                   active={activeTab === 'basic'}/>
                    </TabsList>
                    <TabPanel value="blocked">
                        <Fade in={activeTab === 'blocked'} timeout={400}>
                            <div>
                                {
                                        <ActiveUsers/>
                                }
                            </div>
                        </Fade>
                    </TabPanel>
                    <TabPanel value="basic">
                        <Fade in={activeTab === 'basic'} timeout={400}>
                            <div>
                                <BlockedUsers/>
                            </div>
                        </Fade>
                    </TabPanel>
                </Tabs>
            </div>
        </Spring>
    )
}

export default DisplayUsers