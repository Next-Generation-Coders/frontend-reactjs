// styling
import styles from './styles.module.scss';

// components
import {Helmet} from 'react-helmet';
import RangeSlider from '@ui/RangeSlider';
import SidebarTrigger from '@ui/SidebarTrigger';
import User from './User';
import Search from './Search';
import TruncatedText from '@components/TruncatedText';

// hooks
import  {useWindowSize} from 'react-use';
import {useThemeProvider} from '@contexts/themeContext';
import {useShopProvider} from '@contexts/shopContext';
import useMeasure from 'react-use-measure';
import useStoreRoute from '@hooks/useStoreRoute';

import PropTypes from 'prop-types';
import {useEffect, useState} from "react";
import axios from "axios";
import Role from "@utils/Role";
import {useAuthContext} from "@hooks/useAuthContext";
import notificationSound from '@assets/notification/mixkit-happy-bells-notification-937.wav';
import {useNavigate} from "react-router-dom";
import Collaborate from "@layout/PageHeader/Collaborate";

const  TabletHeader = ({title}) => {
    const [ref, {width}] = useMeasure();
    const { USER } = useAuthContext();
    const isUser = USER && USER.roles && USER.roles.length === 1 && USER.roles[0] === Role.USER;

    return (
        <div className={`${styles.tablet} d-flex align-items-center justify-content-between g-20`}>
            <div className="d-flex align-items-center flex-1 g-30">
                <SidebarTrigger/>
                <div className="flex-1" ref={ref}>
                    <TruncatedText className={`${styles.title} h2`} text={title} width={width} lines={1}/>
                </div>
            </div>
            <div className="d-flex align-items-center g-20">
                {isUser && <Collaborate/>}
                {/*<Search/>*/}
                <User/>
            </div>
        </div>
    )
}

const DesktopHeader = ({title}) => {
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
                    const responsecomplaint = await axios.get(`http://localhost:3000/api/AllComplaints`);
                    if (responsecomplaint.data && Array.isArray(responsecomplaint.data.complaints)) {
                        const filteredComplaints = responsecomplaint.data.complaints.filter(complaint => complaint.adminResponse === "");
                        setNotifications(filteredComplaints);
                        setNotificationCount(filteredComplaints.length);
                    }
                } else if (USER) {
                    const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
                    const userId = userResponse.data._id;
                    const response = await axios.get(`http://localhost:3000/Notification/getByUserId/${userId}`);
                    setNotifications(response.data);
                    const countResponse = await axios.get(`http://localhost:3000/Notification/getNotificationCountByUserId/${userId}`);
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
        <div className={`${styles.desktop} d-flex justify-content-between align-items-center g-20`}>
            <div className="d-flex align-items-center flex-1 g-30">
                {width < 1920 && <SidebarTrigger/>}
                <div className="flex-1" ref={ref}>
                    <TruncatedText className={`${styles.title} h2`} text={title} width={titleWidth} lines={1}/>
                </div>
            </div>
            <div className="d-flex align-items-center">
                {isUser && <Collaborate/>}
                {/*<Search/>*/}
                <div className="d-flex g-30" style={{margin: '0 50px'}}>
                    <button className={`${styles.control} h5`} onClick={toggleTheme}>
                        <i className={`icon-${theme === 'light' ? 'moon' : 'sun'}`}/>
                        Theme
                    </button>
                    <button className={`${styles.control} h5`} onClick={toggleDirection}>
                        <i className="icon icon-book-regular"/>
                        {direction === 'ltr' ? 'RTL' : 'LTR'}
                    </button>
                    <div className="d-flex g-16">
                        <span className={`${styles.control} h5`}>
                            <i className="icon-text"/> Font size
                        </span>
                        <RangeSlider value={fontScale}
                                     onChange={e => changeFontScale(e.target.value)}
                                     min={1}
                                     max={1.06}
                                     step={0.01}/>
                    </div>

                    <div className="d-flex g-16">
                        {notificationCount > 0 && (
                            <button className={`${styles.control} ${styles[direction]} h5`} onClick={() => { setCartOpen(true); playNotificationSound(); }}>
                                <i className="icon icon-gear-regular"/>
                                <span className={styles.control_indicator}/>
                                Notification ({notificationCount})
                            </button>
                        )}


                    </div>
                    <div className="d-flex g-16">
                        <button className={`${styles.control} ${styles[direction]} h5`}
                            // onClick={() =>{ setCartOpen(true);}}
                                onClick={goToChat}
                        >
                            <i className="icon icon-envelope"/>
                            <span className={styles.control_indicator}/>
                            Message
                        </button>

                    </div>
                </div>
                <User/>
            </div>
        </div>
    )
}

const PageHeader = ({title}) => {
    const {width} = useWindowSize();

    return (
        <>
            <Helmet>
                <title>{title} | LinkUpTournament</title>
            </Helmet>
            {
                width < 1280 ?
                    (
                        width < 768 ?
                            <h1 className={`${styles.title} h2`}>{title}</h1>
                            :
                            <TabletHeader title={title}/>
                    )
                    :
                    <DesktopHeader title={title}/>
            }
        </>
    )
}

PageHeader.propTypes = {
    title: PropTypes.string.isRequired
}

export default PageHeader