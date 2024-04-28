import { useState } from 'react'
import {useAuthContext} from "@hooks/useAuthContext";
import {toast} from "react-toastify";


export const useWatchStream = () => {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [roomUrl,setRoomUrl] = useState('');
    const [roomInfo, setRoomInfo] = useState(null);
    const [owner,setOwner] = useState('');
    const [roomName,setRoomName] = useState('');
    const [isHost,setIsHost] = useState(false);
    const {USER,dispatch} = useAuthContext();
    const getStreamUrl = async () =>{
        try{
            setIsLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/stream/playing',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${token}`
                }
            })
            const json = await response.json();
            if(json.error){
                if(json.error === 'jwt expired'){
                    localStorage.removeItem('token');
                    dispatch({type:'LOGOUT'})
                }
                setIsLoading(false)
                setError(json.error)
            }
            if(!json.error){
                const sortedStreams = json.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
                const stream = sortedStreams[0];
                setRoomUrl(stream.roomUrl);
                setOwner(stream.owner);
                setIsHost(USER.email===stream.owner);
                setRoomName(stream.roomName);
                setIsLoading(false);
            }
        }catch (e){
            toast.error('There was an error joining the live stream, Please try again');
            console.log(e.message)
        }
    }
    const joinStream = async () => {
        try{
            setIsLoading(true)
            setError('')
            const tokenResp = await fetch('http://localhost:3000/stream', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const json = await tokenResp.json();
            const roomProperties = {
                properties: {
                    is_owner: isHost,
                    room_name: roomName,
                    user_name: USER.fullname
                }
            };
            const response = await fetch('https://api.daily.co/v1/meeting-tokens', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${json}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(roomProperties)
            });
            const data = await response.json();
            setRoomInfo({
                token: data.token,
                username: USER.fullname,
                accountType: 'admin',
            });
            setIsLoading(false);
        }
        catch(e){
            setIsLoading(false);
            setError(e.message);
        }
    }

    return { joinStream,getStreamUrl, isLoading, error, roomUrl, roomInfo}
}