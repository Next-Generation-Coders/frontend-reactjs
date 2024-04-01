import { useState} from 'react'
import {toast} from "react-toastify";

export const useFindUserTour = () => {

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(null)
    const [tournaments,setTournaments] = useState([])
    const [teams,setTeams] = useState([])
    const [userTeam,setUserTeam] = useState({})
    const findTours = async () => {
        setIsLoading(true)
        setError('')
        const response = await fetch(process.env.REACT_APP_BASE_URL+`/User/player-tournaments`, {
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
            console.log(json);
            setTournaments(json);
            setIsLoading(false)
        }
        setIsLoading(false);
    }
    const findTeams = async (tournament) => {
        setIsLoading(true)
        setError('')
        const response = await fetch(process.env.REACT_APP_BASE_URL+`/User/player-teams/${tournament._id}`, {
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