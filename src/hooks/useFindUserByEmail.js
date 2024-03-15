import { useState} from 'react'
import { useAuthContext } from './useAuthContext'
import {toast} from "react-toastify";
import {jwtDecode} from "jwt-decode";

export const useFindUserByEmail = () => {

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const getByEmail = async (email) => {
        setIsLoading(true)
        setError('')

        const response = await fetch(`http://localhost:3000/User/email/${email}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
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
            console.log(USER)
            dispatch({type: 'LOGIN', payload: USER})

            setIsLoading(false)
            /*            if(json.user.isVerified){
                            toast.success(`Welcome back!`)
                        }*/
            // else {
            //     toast.warn(`Your account is not verified yet, check your inbox!`)
            // }
        }
    }

    return { getByEmail, isLoading, error }
}