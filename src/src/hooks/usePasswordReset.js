import { useState } from 'react'
import {toast} from "react-toastify";

export const usePasswordReset = () => {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(null)

    const resetPassword = async (email) => {
        setIsLoading(true)
        setError('')

        const response = await fetch('http://localhost:3000/User/reset', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email })
        })
        const json = await response.json()

        if (json.error) {
            setError(json.error)
            setIsLoading(false)
            toast.error(json.error);
        }
        if (!json.error) {
            toast.info(`New password was sent to ${email}`);
            // update loading state
            setIsLoading(false)
        }
    }

    return { resetPassword, isLoading, error }
}