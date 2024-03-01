// styling
import styles from './styles.module.scss';
// components
import Submenu from '@ui/Submenu';
import SettingsPopup from '@layout/BottomNav/SettingsPopup';

import {useAuthContext} from '@hooks/useAuthContext'
// hooks
import useSubmenu from '@hooks/useSubmenu';
import {useWindowSize} from 'react-use';
import {useState} from 'react';
import useStoreRoute from '@hooks/useStoreRoute';
import {useShopProvider} from '@contexts/shopContext';
import {useLogout} from '@hooks/useLogout';
import {useEffect} from "react";
// assets
import user from '@assets/placeholder.webp';
import {useNavigate} from "react-router-dom";

const User = () => {



    const [popupOpen, setPopupOpen] = useState(false);
    const {anchorEl, open, handleClick, handleClose} = useSubmenu();
    const isTablet = useWindowSize().width < 1280;
    const isStoreRoute = useStoreRoute();
    const {setCartOpen} = useShopProvider();
    const navigate = useNavigate();

    const settingsPopup = {
        label: 'UI Settings',
        icon: 'gear-solid',
        onClick: () => setPopupOpen(true)
    }

    const {USER,dispatch} = useAuthContext();

    const {logout} = useLogout();
    const onClickChangeAccount=()=>{
        console.log('Change account!')
    }
    const onClickLogout=()=>{
        logout()
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const email = queryParams.get('email');
        const fullname = queryParams.get('fullname');
        const secret = queryParams.get('secret');
        if (email && fullname && secret) {
            const json = {fullname:fullname,email:email,secret:secret}
            console.log(email);
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({type: 'LOGIN', payload: json})
            navigate('/')
        }
    });
    const submenuActions = [
        {
            label: 'Change user',
            icon: 'users-two',
            onClick: onClickChangeAccount
        },
        {
            label: 'Logout',
            icon: 'exit',
            onClick: onClickLogout
        }
    ];

    const goToLogin = ()=>{
        navigate('/login')
    }
    const goToSignUp = ()=>{
        navigate('/sign-up')
    }

    return (
        USER ?
        <div className="d-flex align-items-center g-16">
            <div>
            </div>
            <div className={styles.avatar}>
                <img className="c-pointer" src={user} alt="user" onClick={handleClick}/>
                {
                    isStoreRoute && isTablet && (
                        <button className={styles.avatar_cart} aria-label="Shopping cart" onClick={() => setCartOpen(true)}>
                            <i className="icon-bag-solid"/>
                        </button>
                    )
                }
            </div>
            <div className="d-flex flex-column">
                <span className="h3" style={{letterSpacing: 0.2}}>
                    {USER.fullname}
                </span>
                <span className="text-12">{USER.email}</span>
            </div>
            <Submenu open={open}
                     onClose={handleClose}
                     anchorEl={anchorEl}
                     actions={isTablet ? [settingsPopup, ...submenuActions] : submenuActions}/>
            <SettingsPopup open={popupOpen} onClose={() => setPopupOpen(false)}/>
        </div>
        :
        <div>
        <span><button className='btn btn--sm' onClick={goToLogin}>Login</button>
        <button className='btn btn--outlined btn--sm' onClick={goToSignUp}>Sign up</button></span>
        </div>
    )
}

export default User