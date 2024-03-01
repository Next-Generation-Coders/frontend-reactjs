// styling
import styles from './styles.module.scss';

// components
import {NavLink} from 'react-router-dom';

// utils
import PropTypes from 'prop-types';

const Logo = ({size = 'sm'}) => {
    return (
        <NavLink className={`${styles.logo} ${styles[size]}`} to="/">
            linkup
            <span className={styles.logo_highlight}>
                <span>tournament</span>
            </span>
        </NavLink>
    )
}

Logo.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'xl'])
}

export default Logo