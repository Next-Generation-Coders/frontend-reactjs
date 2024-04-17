import { useState} from 'react'
import {toast} from "react-toastify";

export const useFindUserTour = () => {

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(null)
    const [tournaments,setTournaments] = useState([])
    const [teams,setTeams] = useState([])
    const [userTeam,setUserTeam] = useState({})
    const findTours = async (userId = null) => {
        setIsLoading(true);
        setError('');

    
        try {
            let response 
            if(!userId){
                response = await fetch('http://localhost:3000/User/player-tournaments', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
            }else {
                let UserDataResponse ;
                UserDataResponse = await fetch(`http://localhost:3000/User/getbyid/${userId}`);
                const userData = await UserDataResponse.json();
                 response = await fetch(`http://localhost:3000/User/player-tournaments?userId=${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
                    
                });
            }
            const json = await response.json();
    
            if (json.error) {
                setError(json.error);
                setIsLoading(false);
                toast.error(json.error);
            } else {
                setTournaments(json);
            }
        } catch (error) {
            console.error('Error fetching tournaments:', error);
            setError('Failed to fetch tournaments');
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };
    const findTeams = async (tournament) => {
        setIsLoading(true)
        setError('')
        const response = await fetch(`http://localhost:3000/User/player-teams/${tournament._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        const json = await response.json()

        if (json.error) {
            setError(json.error)
            setIsLoading(false)
            toast.error(json.error);
        }
        if (!json.error) {
            setTeams(json.teams);
            setUserTeam(json.myTeam)
            console.log(json);
            setIsLoading(false)
        }
        setIsLoading(false);
    }


    return { findTours,tournaments, isLoading, error, findTeams, teams,userTeam}
}