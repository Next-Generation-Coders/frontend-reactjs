import { useState } from 'react';

const FollowButton = ({selectedTournamentId}) => {
    const [isFollowing, setIsFollowing] = useState(false);

    const toggleFollow = async () => {
        try {
            const response = await fetch(`http://localhost:3000/Tournament/follow/${selectedTournamentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to follow/unfollow tournament');
            }
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error('Error following/unfollowing tournament:', error);
        }
    };


    return (
        <button style={{marginBottom : '15px'}} className='btn' onClick={toggleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
    );
};

export default FollowButton;
