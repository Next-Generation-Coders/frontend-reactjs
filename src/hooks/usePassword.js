import { useState } from 'react'
import {toast} from "react-toastify";

export const usePassword = () => {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(null)

    const changePassword = async (currentPassword,newPassword) => {
        setIsLoading(true)
        setError('')
        const data={currentPassword,newPassword}
        const response = await fetch('http://localhost:3000/User/change-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token').toString()}`
            },
            body: JSON.stringify(data),
        })
        const json = await response.json()

        if (json.error) {
            setError(json.error)
            setIsLoading(false)
            toast.error(json.error);
        }
        if (!json.error) {

            setIsLoading(false)
            toast.success("You can now login with your new password!")


        }
    }

    return { changePassword, isLoading, error }
}