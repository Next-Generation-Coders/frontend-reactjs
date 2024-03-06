import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export const useLogin = () => {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate();

    const login = async (email, password) => {
        setIsLoading(true)
        setError('')

        const response = await fetch('http://localhost:3001/User/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()

        if (json.error) {
            setError(json.error)
            setIsLoading(false)
            toast.error(json.error);
        }
        if (!json.error) {
            localStorage.setItem('user', JSON.stringify(json.user))
            localStorage.setItem('token', json.accessToken)

            dispatch({type: 'LOGIN', payload: json.user})

            setIsLoading(false)
            /*            if(json.user.isVerified){
                            toast.success(`Welcome back!`)
                        }*/
            // else {
            //     toast.warn(`Your account is not verified yet, check your inbox!`)
            // }
            navigate('/');
        }
    }

    return { login, isLoading, error }
}