import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import {toast} from "react-toastify";

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
                'Authorization': `Bearer ${localStorage.getItem('token').toString()}`
            },
            body: JSON.stringify({user})
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