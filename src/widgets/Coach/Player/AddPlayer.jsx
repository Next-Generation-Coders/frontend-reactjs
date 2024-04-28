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
import TeamProfile from '@widgets/PlayerProfileCard copy/index';
import Fade from '@mui/material/Fade';
import Search from '@layout/PageHeader/Search';
import {useAuthContext} from "@hooks/useAuthContext";
import axios from 'axios';
import { Link } from 'react-router-dom';
// hooks
import React, { useState, useEffect } from 'react';
import {useWindowSize} from 'react-use';

const checkTeam_manager = async (coachId) => {
    try {
      const response = await fetch(`http://localhost:3000/Team/checkTeam_manager/${coachId}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  
  const AddPlayer = () => {
    const {USER} = useAuthContext();
    const [activeTab, setActiveTab] = useState('basic');
    const [coachHasTeam, setCoachHasTeam] = useState(false);
    const { width } = useWindowSize();
    const value = sessionStorage.getItem('playerName');

    useEffect(() => {
      async function fetchData() {
        const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
        const userId = userResponse.data._id;
        const hasTeam = await checkTeam_manager(userId);
        setCoachHasTeam(hasTeam);
        console.log(hasTeam)
      }
      fetchData();
    }, [value]);
  
    return (
      <Spring className="card d-flex flex-column card-padded">
        <Tabs value={activeTab}>
          <TabsList className={`${styles.tabs_list} tab-nav ${coachHasTeam ? 'col-2' : 'col'}`}>
            {!coachHasTeam && (
              <TabButton
                title={width >= 375 ? 'Add Team' : 'Profile'}
                onClick={() => setActiveTab('profile')}
                active={activeTab === 'profile'}
              />
            )}
            
            {coachHasTeam && (
              <>
                <TabButton
                  title={width >= 375 ? 'Add Players' : 'Basic'}
                  onClick={() => setActiveTab('basic')}
                  active={activeTab === 'basic'}
                />
                <TabButton
                  title={width >= 375 ? "Add Coach": 'addCoach'}
                  onClick={() => setActiveTab('addCoach')}
                  active={activeTab === 'addCoach'}
                />
                
              </>
            )}
          </TabsList>
          {!coachHasTeam ? (
            <>
              <TabPanel value="profile">
                <Fade in={activeTab === 'profile'} timeout={400}>
                  <div>
                    <Team />
                  </div>
                </Fade>
              </TabPanel>
            </>
          ) : (
            <>
              <TabPanel value="profile">
                <Fade in={activeTab === 'profile'} timeout={400}>
                  <div>
                    <TeamProfile />
                    <Link to={`/team-Profile/`}>
                    <div className={styles.footer}>
                      <button className="btn" >Go to Team Profile</button>
                    </div>
                    </Link>
                  </div>
                </Fade>
              </TabPanel>

            </>
          )}

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