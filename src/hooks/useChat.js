import { useState} from 'react'
import {toast} from "react-toastify";

export const useChat = () => {

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(null)
    const [chat,setChat] = useState({})

    const createChat = async (chat) => {
        setIsLoading(true)
        setError('')
        const response = await fetch(`http://localhost:3000/Chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify(chat)
        })
        const json = await response.json()

        if (json.error) {
            setError(json.error)
            setIsLoading(false)
            toast.error(json.error);
            console.log("error:",json.error);
        }
        if (!json.error) {
            console.log(json);
            setChat(json);
            setIsLoading(false)
            return chat;
        }
        setIsLoading(false);
    }


    return { createChat, isLoading, error, chat}
}