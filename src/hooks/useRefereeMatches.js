import { useState} from 'react'
import {toast} from "react-toastify";

export const useRefereeMatches = () => {

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(null)
    const [matches,setMatches] = useState([])

    const findMatches = async () => {
        setIsLoading(true)
        setError('')
        const response = await fetch(`http://localhost:3000/Match/ref-matches`, {
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
            setMatches(json);
            setIsLoading(false)
        }
        setIsLoading(false);
    }


    return { findMatches, isLoading, error, matches}
}