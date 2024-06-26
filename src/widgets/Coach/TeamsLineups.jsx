// components
import Spring from '@components/Spring';
import TabButton from '@ui/TabButton';
import Lineups from '@components/Lineups';
import {TabsList} from '@mui/base/TabsList';
import {TabPanel} from '@mui/base/TabPanel';
import {Tabs} from '@mui/base/Tabs';
import Fade from '@mui/material/Fade';
import lineup from '@widgets/Coach/team_lineup'

// hooks
import {useState} from 'react';

// data placeholder
import pitch from '@db/pitch';

const TeamsLineups = () => {
    const [activeTab, setActiveTab] = useState('realmadrid');

    return (
        <Spring className="card h-2 card-padded">
            <Tabs className="d-flex flex-column h-100 g-30" value={activeTab}>
                <TabsList className="tab-nav col">
                    <TabButton title="Real Madrid"
                               onClick={() => setActiveTab('realmadrid')}
                               active={activeTab === 'realmadrid'}
                               type="color"
                               color="accent"/>

                </TabsList>
                <div className="flex-1 h-100">
                    <TabPanel className="h-100" value="realmadrid">
                        <Fade in={activeTab === 'realmadrid'} timeout={400}>
                            <div className="h-100" style={{marginTop: 10}}>
                                <Lineups data={pitch}/>
                                
                            </div>
                        </Fade>
                    </TabPanel>

                </div>
            </Tabs>
        </Spring>
    )
}

export default TeamsLineups