// styling
import styles from './styles.module.scss';

// components
import Spring from '@components/Spring';
import {useNavigate} from 'react-router-dom';

// hooks
import {useThemeProvider} from '@contexts/themeContext';

// utils
import classNames from 'classnames';

// assets
import dark403 from '@assets/403dark.webp';
// import light404 from '@assets/404light.webp';

const Error403 = () => {
    const {theme} = useThemeProvider();
    const navigate = useNavigate()
    const goBack = ()=>{
        navigate(-1)
    }
    return (
        <Spring className={`${styles.container} card d-flex align-items-center flex-1`}>
            <div className={styles.media}>
                <img className={classNames(styles.media_img, {[styles.visible]: theme === 'light'})}
                     src={dark403}
                     alt="403"/>
                <img className={classNames(`${styles.media_img} ${styles.dark}`, {[styles.visible]: theme === 'dark'})}
                     src={dark403}
                     alt="403"/>
            </div>
            <div className={styles.main}>
                <h2 className={styles.main_title}>
                    Oops! <span>You are not authorized to enter this page</span>
                </h2>
                <p className={styles.main_text}>
                    Please check the URL in the address bar and try again.
                </p>
                <button className="btn" onClick={goBack}>Go back</button>
            </div>
        </Spring>
    )
}

export default Error403