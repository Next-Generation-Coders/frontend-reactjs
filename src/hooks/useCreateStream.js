import { useState } from 'react'
import {useAuthContext} from "@hooks/useAuthContext";

export const useCreateStream = () => {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [roomUrl,setRoomUrl] = useState(null);
    const [roomInfo, setRoomInfo] = useState(null);
    const [isHost,setIsHost]= useState(true);
    const {USER,dispatch} = useAuthContext();


    const createRoom = async (roomName) => {
        setIsLoading(true)
        setError('')

        const response = await fetch('http://localhost:3000/stream', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const json = await response.json()

        if (json.error) {
            if(json.error === 'jwt expired'){
                localStorage.removeItem('token');
                dispatch({type:'LOGOUT'})
            }
            setIsLoading(false);
            setError(json.error);
        }
        if (!json.error) {
            try {
                const dailyResponse = await fetch('https://api.daily.co/v1/rooms/', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${json}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: roomName,
                        privacy: 'public',
                        properties: {
                            owner_only_broadcast: true,
                            start_audio_off: true,
                            start_video_off: true,
                            enable_chat:true,
                            enable_advanced_chat:true,
                            enable_mesh_sfu:true,
                        }
                    })
                })
                const room = await dailyResponse.json();
                console.log(room)
                const organizerToken = localStorage.getItem('token');
                const streamObject = {
                    roomName,
                    roomUrl : room.url
                }
                const createStreamResponse = await fetch('http://localhost:3000/stream',{
                    method:'POST',
                    headers:{
                        'authorization': `Bearer ${organizerToken}`,
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(streamObject)
                })
                const result = await createStreamResponse.json();
                if(result.error){
                    setError(result.error);
                    setIsLoading(false);
                }
                if(!result.error){
                    console.log(result.email===USER.email);
                    setIsHost(USER.email===result.email);
                }
                const roomProperties= {
                    properties: {
                        is_owner: isHost,
                        room_name: roomName,
                        user_name: USER.fullname
                    }
                }

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
                    token:data.token,
                    username: USER.fullname,
                    accountType: isHost ? 'admin' : 'participant',
                });
                setRoomUrl(room.url);
            }catch (e){
                setIsLoading(false);
                setError(e.message);
            }
        }
    }

    return { createRoom, isLoading, error ,roomUrl,roomInfo}
}