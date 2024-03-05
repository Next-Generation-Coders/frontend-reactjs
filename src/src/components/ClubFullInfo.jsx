// components
import SubmenuButton from '@ui/SubmenuButton';
import Submenu from '@ui/Submenu';
import TruncatedText from '@components/TruncatedText';

// hooks
import useSubmenu from '@hooks/useSubmenu';
import {useWindowSize} from 'react-use';
import useMeasure from 'react-use-measure';

// utils
import PropTypes from 'prop-types';

const ClubFullInfo = ({club, country, isCompact}) => {
    const [nameRef, {width}] = useMeasure();
    const {anchorEl, open, handleClick, handleClose} = useSubmenu();
    const isSmallScreen = useWindowSize().width < 414;
    const isIconOnly = isSmallScreen || isCompact;

    const submenuActions = [
        {
            label: 'Share',
            icon: 'share',
        },
        {
            label: 'Follow',
            icon: 'follow',
        }
    ]

    return (
        <div className="d-flex flex-column g-20">
            <div className="club_header d-flex align-items-center g-14">
                <img className="club-logo" src={club.logo} alt={club.name}/>
                <div className="club_header-main d-flex flex-column g-10 w-100" ref={nameRef}>
                    <TruncatedText className="h2" text={club.shortName || club.name} lines={1} width={width}/>
                    <span className="text-12">{club.city}, {country || club.country}</span>
                </div>
            </div>
          
        </div>
    )
}

ClubFullInfo.propTypes = {
    club: PropTypes.object.isRequired,
    country: PropTypes.string,
}

export default ClubFullInfo