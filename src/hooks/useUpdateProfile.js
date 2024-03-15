import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import {toast} from "react-toastify";
import {jwtDecode} from "jwt-decode";

export const useUpdateProfile = () => {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(null)
    const { USER, dispatch } = useAuthContext()

    const update = async (user) => {
        setIsLoading(true)
        setError('')
        user.email = USER.email;
        const response = await fetch('http://localhost:3000/User/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({user})
        })
        const json = await response.json()

        if (json.error) {
            if(json.error === "jwt expired"){
                toast.error("Your session has expired, Please re-sign in");
                localStorage.removeItem('token');
                dispatch({type:'LOGOUT'})
            }
            setError(json.error)
            setIsLoading(false)
            toast.error(json.error);
        }
        if (!json.error) {
            localStorage.setItem('token', json.accessToken)

            const u = jwtDecode(json.accessToken.toString());
            const USER = u.user
            dispatch({type: 'LOGIN', payload: USER})
            setIsLoading(false)
            toast.success(`Your changes have been saved!`)


            /*            if(json.user.isVerified){
                            toast.success(`Welcome back!`)
                        }*/
            // else {
            //     toast.warn(`Your account is not verified yet, check your inbox!`)
            // }
        }
    }

    return { update, isLoading, error }
}