import { useEffect, useState } from 'react';

const FollowButton = ({selectedTournamentId}) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [tournament , setTournament]= useState();
    const [tournamentid , setTournamentid]= useState();

    useEffect(() => {
        const fetchTournamentDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/Tournament/getbyid/${selectedTournamentId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tournament details');
                }
                const tournamentData = await response.json();
                setTournament(tournamentData);
              
            } catch (error) {
                console.error('Error fetching tournament details:', error);
            }
        };
    
        fetchTournamentDetails();
    }, [selectedTournamentId]);
    const toggleFollow = async () => {
       
        if(selectedTournamentId){
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

    }
    return (
        <div >
        <button style={{marginBottom : '15px'}} className='btn' onClick={toggleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
    </div>
    );
};

export default FollowButton;
