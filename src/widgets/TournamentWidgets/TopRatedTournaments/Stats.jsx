import { FaUserFriends } from 'react-icons/fa';
const FollowersStats = ({ goals = 0 }) => {
    return (
        <div className="d-flex align-items-center g-8">
           <FaUserFriends  className="text-12 text-header" /> 
            <span className="h6 text-uppercase" style={{letterSpacing: '0.2px', marginRight : "30px"}}>
                {goals} Followers
            </span>
        </div>
    )
}

export default FollowersStats