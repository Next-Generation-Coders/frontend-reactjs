// styling
import styles from './styles.module.scss';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// components
import Spring from '@components/Spring';
import {NavLink} from 'react-router-dom';
import ScrollContainer from '@components/ScrollContainer';
import Popup from '@components/Popup';
import TruncatedText from '@components/TruncatedText';
import IconButton from '@ui/IconButton';
import Like from '@ui/Like';

// hooks
import useMeasure from 'react-use-measure';
import {useShopProvider} from '@contexts/shopContext';

// assets
import img1 from '@assets/cart/téléchargement2.png';
import img2 from '@assets/cart/a.jpg';
import img3 from '@assets/cart/b.avif';
import img4 from '@assets/cart/c.png';
import img5 from '@assets/cart/téléchargement.png';
import img6 from '@assets/cart/d.png';

import {useAuthContext} from "@hooks/useAuthContext";

const NotificationCart = ({isPopup}) => {
    const {cartOpen, setCartOpen} = useShopProvider();
    const [headerRef, {height: headerHeight}] = useMeasure();
    const [footerRef, {height: footerHeight}] = useMeasure();
    const [nameRef, {width}] = useMeasure();
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);

    const { USER } = useAuthContext();
    const Wrapper = isPopup ? Popup : Spring;

    const wrapperProps = isPopup ? {
        open: cartOpen,
        onClose: () => setCartOpen(false),
        popupClass: styles.popup
    } : {
        className: 'card h-2 d-flex flex-column'
    };

    const getRandomImage = () => {
        const images = [img1, img2, img3, img4, img5, img6];
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    };

    const handleHideNotification = async (notificationId) => {
        try {
            await axios.put(`http://localhost:3000/Notification/hide/${notificationId}`);
            const updatedNotifications = notifications.filter(notification => notification._id !== notificationId);
            setNotifications(updatedNotifications);

        } catch (error) {
            console.error('Error hiding notification:', error);
        }
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
        <Wrapper {...wrapperProps}>
            <h3 className="card_header" style={{ paddingBottom: 20 }} ref={headerRef}>
                Notification cart ({notificationCount})
            </h3>
            <ScrollContainer height={headerHeight + footerHeight}>
                <div className="track d-flex flex-column flex-1">
                    {notifications.map((notification) => (

                        <div className={`${styles.item} d-flex align-items-center justify-content-between g-20`} key={notification._id}>
                            <div className="d-flex align-items-center flex-1 g-10">
                                <img className="square-avatar" src={getRandomImage()} />
                                <div className="d-flex flex-column flex-1" ref={nameRef}>
                                    {USER && USER.email === 'moatazfoudhaily@gmail.com' && (
                                        <NavLink to="/complaint-list">
                                            <TruncatedText className="h4" text={notification.title} width={width} lines={1}/>
                                        </NavLink>
                                    )}

                                    <span className={`label label--store ${isPopup ? 'h5' : 'h6'}`}>
                                            <p>{notification.description}</p>
                                    </span>

                                </div>
                            </div>

                            {
                                isPopup ?
                                    <div className="d-flex g-10">
                                        <Like isCartAction/>
                                        <IconButton icon="eye-slash" ariaLabel="Hide notification" isCartAction onClick={() => handleHideNotification(notification._id)} />
                                    </div>
                                    :
                                    <h3 className="text-highlight"></h3>
                            }
                        </div>
                    ))}
                </div>
            </ScrollContainer>
            <div className="card-padded d-flex flex-column g-20" ref={footerRef}>

                <button className="btn w-100">
                    {USER && USER.email === 'moatazfoudhaily@gmail.com' && (
                        <NavLink to="/complaint-list">Proceed to all notification</NavLink>
                    )}
                    </button>

            </div>
        </Wrapper>
    )
}

export default NotificationCart