// styling
import styles from '../styles.module.scss';

// components
import Spring from '@components/Spring';
import {TabsList} from '@mui/base/TabsList';
import {TabPanel} from '@mui/base/TabPanel';
import {Tabs} from '@mui/base/Tabs';
import TabButton from '@ui/TabButton';
import Team from '@widgets/Coach/Player/Team Creation';
import Profile from '@widgets/Coach/Player/Profile';
import Coach from '@widgets/Team/Coach_List_With_No_Team/CoachListWithNoTeam';
import Fade from '@mui/material/Fade';
import Search from '@layout/PageHeader/Search';

// hooks
import React, { useState, useEffect } from 'react';
import {useWindowSize} from 'react-use';

const checkCoach = async (coachId) => {
    try {
      const response = await fetch(process.env.REACT_APP_BASE_URL+`/Team/checkCoach/${coachId}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  
  const AddPlayer = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [coachHasTeam, setCoachHasTeam] = useState(false);
    const { width } = useWindowSize();
  
    useEffect(() => {
      async function fetchData() {
        const coachId = '65ec9ea8b7fc6d8a3d4f3536'; // Assuming this is the coach's ID 65da0a78e7132bcf916bf3d0
        const hasTeam = await checkCoach(coachId);
        setCoachHasTeam(hasTeam);
        console.log(hasTeam)
      }
      fetchData();
    }, []);
  
    return (
        <Spring className="card d-flex flex-column card-padded">
          <Tabs value={activeTab}>
            <TabsList className={`${styles.tabs_list} tab-nav ${coachHasTeam ? 'col-2' : 'col'}`}>
              <TabButton
                title={width >= 375 ? 'Add Team' : 'Profile'}
                onClick={() => setActiveTab('profile')}
                active={activeTab === 'profile'}
              />
              {coachHasTeam && (
                <>
                <TabButton
                title={width >= 375 ? "Add Coach":'addCoach'}
                onClick={() => setActiveTab('addCoach')}
                active={activeTab === 'addCoach'}
                />
                <TabButton
                  title={width >= 375 ? 'Add Players' : 'Basic'}
                  onClick={() => setActiveTab('basic')}
                  active={activeTab === 'basic'}
                />
                </>
              )}
            </TabsList>
            <TabPanel value="profile">
              <Fade in={activeTab === 'profile'} timeout={400}>
                <div>
                  <Team />
                </div>
              </Fade>
            </TabPanel>
            <TabPanel value="basic">
              <Fade in={activeTab === 'basic'} timeout={400}>
                <div>
                  <Profile />
                </div>
              </Fade>
            </TabPanel>
            <TabPanel value="addCoach">
              <Fade in={activeTab === 'addCoach'} timeout={400}>
                <div>
                  <Coach />
                </div>
              </Fade>
            </TabPanel>
          </Tabs>
        </Spring>
      );
    };

  
  export default AddPlayer;