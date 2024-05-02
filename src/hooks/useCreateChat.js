import {useState} from 'react'
import {toast} from "react-toastify";
import {useAuthContext} from "@hooks/useAuthContext";

export const useCreateChat = () => {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext();
    const createNewChat = async (chat) => {
        setIsLoading(true)
        setError('')

        const response = await fetch('http://localhost:3000/Chat/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify(chat),

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
        }
        if (!json.error) {
            setIsLoading(false)
        }
    }

    return { createNewChat, isLoading, error}
}