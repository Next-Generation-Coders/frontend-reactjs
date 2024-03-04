import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export const useSignup = () => {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate();

    const signup = async (email, password,phone,age,fullname) => {
        setIsLoading(true)
        setError('')

        const response = await fetch('http://localhost:3000/User/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password,phone,age,fullname })
        })
        const json = await response.json()

        if (json.error) {
            setError(json.error)
            setIsLoading(false)
            toast.error(json.error);
        }
        if (!json.error) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            // update loading state
            setIsLoading(false)
            toast.success(`Account created! Please check your email ${json.email} to confirm your account.`)
            navigate('/');
        }
    }

    return { signup, isLoading, error }
}