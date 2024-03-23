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
import {useNavigate} from "react-router-dom";

// assets
import user from '@assets/placeholder.webp';

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

    const {USER} = useAuthContext();
    const {logout} = useLogout();
    const onClickProfile=()=>{
        navigate('/profile')
    }
    const onClickLogout=()=>{
        logout()
    }

    useEffect(() => {
        if(!USER){
            const queryParams = new URLSearchParams(window.location.search);
            const token = queryParams.get('token');
            if (token) {
                async function fetchByEmail(){
                    await localStorage.setItem('token',token)
                }
                fetchByEmail().then(()=>{
                    navigate('/')
                })
            }
        }
    });
    const submenuActions = [
        {
            label: 'My Profile',
            icon: 'user',
            onClick: onClickProfile
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
                    <img className="c-pointer" src={USER.avatar ? USER.avatar : user} alt="user" onClick={handleClick}/>
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