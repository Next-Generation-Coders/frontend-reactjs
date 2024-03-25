import {useEffect, useState} from 'react'
import {toast} from "react-toastify";
import {useAuthContext} from "@hooks/useAuthContext";
import {useDispatch} from "react-redux";
import {setChats} from "@features/chats/chatSlice"

export const useFindUserChats = () => {
    const dispatchChat = useDispatch();
    const [error, setError] = useState('')
    const [userChats,setUserChats] = useState([]);
    const [messages,setMessages]= useState([]);
    const [selected,setSelected] = useState(null);
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const getChats = async () => {
        setIsLoading(true)
        setError('')

        const response = await fetch('http://localhost:3000/Chat/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },

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
            setUserChats(json);
            dispatchChat(setChats(json))
            if (json.length > 0) {
                setSelected(json[0]);
            }
            setIsLoading(false)
        }
    }
    useEffect(() => {
        async function fetchData() {
            await getChats();
        }
        fetchData();

    }, []);
    return { getChats, isLoading, error, userChats, setUserChats, messages, setMessages,selected,setSelected}
}