import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import {toast} from "react-toastify";
import {jwtDecode} from "jwt-decode";
import {useNavigate,useLocation} from 'react-router-dom';

export const useLogin = () => {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const login = async (email, password) => {
        setIsLoading(true)
        setError('')

        const response = await fetch('http://localhost:3000/User/login', {
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
            localStorage.setItem('token', json.accessToken)

            const u = jwtDecode(json.accessToken.toString());
            const USER = u.user
            if(!USER.isBlocked){
                dispatch({type: 'LOGIN', payload: USER})
                setIsLoading(false)
                navigate(from,{replace:true});
            }
            if(USER.isBlocked){
                setError("Your account has been suspended by an admin");
                setIsLoading(false)
                toast.error("Your account has been suspended by an admin");
            }

        }
    }

    return { login, isLoading, error }
}