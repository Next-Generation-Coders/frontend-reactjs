// styling
import styles from './styles.module.scss'

// components
import {NavLink, useNavigate} from 'react-router-dom';
import SearchPopup from './SearchPopup';
import SettingsPopup from './SettingsPopup';

// hooks

import {useEffect, useState} from 'react';
import useStoreRoute from '@hooks/useStoreRoute';
import {useShopProvider} from '@contexts/shopContext';
import {useWindowSize} from "react-use";
import {useThemeProvider} from "@contexts/themeContext";
import useMeasure from "react-use-measure";
import {useAuthContext} from "@hooks/useAuthContext";
import Role from "@utils/Role";
import notificationSound from "@assets/notification/mixkit-happy-bells-notification-937.wav";
import axios from "axios";

const BottomNav = () => {
    const [searchPopupOpen, setSearchPopupOpen] = useState(false);
    const [settingsPopupOpen, setSettingsPopupOpen] = useState(false);


    const {width} = useWindowSize();
    const {theme, toggleTheme, fontScale, changeFontScale, direction, toggleDirection} = useThemeProvider();
    const {setCartOpen} = useShopProvider();
    const [ref, {width: titleWidth}] = useMeasure();
    const isStoreRoute = useStoreRoute();
    const navigate = useNavigate()
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const [previousNotificationCount, setPreviousNotificationCount] = useState(0);
    const goToChat = ()=>{
        navigate('/chat')
    }
    const { USER } = useAuthContext();
    const isUser = USER && USER.roles && USER.roles.length === 1 && USER.roles[0] === Role.USER;
    const [audio] = useState(new Audio(notificationSound));
    const playNotificationSound = () => {
        audio.play();
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                if (USER && USER.email === 'moatazfoudhaily@gmail.com') {
                    const responsecomplaint = await axios.get(`http://197.26.204.208:3000/api/AllComplaints`);
                    if (responsecomplaint.data && Array.isArray(responsecomplaint.data.complaints)) {
                        const filteredComplaints = responsecomplaint.data.complaints.filter(complaint => complaint.adminResponse === "");
                        setNotifications(filteredComplaints);
                        setNotificationCount(filteredComplaints.length);
                    }
                } else if (USER) {
                    const userResponse = await axios.get(`http://197.26.204.208:3000/User/getbyemail?email=${USER.email}`);
                    const userId = userResponse.data._id;
                    const response = await axios.get(`http://197.26.204.208:3000/Notification/getByUserId/${userId}`);
                    setNotifications(response.data);
                    const countResponse = await axios.get(`http://197.26.204.208:3000/Notification/getNotificationCountByUserId/${userId}`);
                    setNotificationCount(countResponse.data.notificationCount);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        if (USER) {
            fetchNotifications();
            const interval = setInterval(fetchNotifications, 5000);
            return () => clearInterval(interval);
        } else {
            setNotifications([]);
            setNotificationCount(0);
        }
    }, [USER]);






    return (
        <div className={styles.container}>
            <NavLink className={styles.button} to="/profile" aria-label="Account">
                <i className="icon-user"/>
            </NavLink>
            <NavLink className={styles.button} to="/chat" aria-label="Chat">
                <i className="icon icon-envelope"/>
            </NavLink>
            <div className="d-flex g-16">

                {notificationCount > 0 && (
                    <button className={styles.button} onClick={() => { setCartOpen(true); playNotificationSound(); }}>
                        <i className="icon icon-gear-regular"/>
                        <span className={styles.control_indicator}/>
                    </button>
                )}
            </div>

            <button className={styles.button}
                    aria-label="Settings"
                    onClick={() => setSettingsPopupOpen(true)}>
                <i className="icon-gear-regular"/>
            </button>
            <SearchPopup open={searchPopupOpen} onClose={setSearchPopupOpen}/>
            <SettingsPopup open={settingsPopupOpen} onClose={() => setSettingsPopupOpen(false)}/>
        </div>
    )
}

export default BottomNav