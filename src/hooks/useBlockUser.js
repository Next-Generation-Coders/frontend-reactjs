import { useState } from 'react'
import {toast} from "react-toastify";


export const useBlockUser = () => {
    const [error, setError] = useState('')
    const [Loading, setLoading] = useState(null)
    const toggleBlock = async (_id) => {
        setLoading(true)
        setError('')

        const response = await fetch('http://localhost:3000/User/toggle-block', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({_id})

        })
        const json = await response.json()

        if (json.error) {
            setError(json.error)
            setLoading(false)
            toast.error(json.error);
        }
        if (!json.error) {
            toast.success(json.message);
            setLoading(false)
        }
    }

    return { toggleBlock, Loading, error}
}