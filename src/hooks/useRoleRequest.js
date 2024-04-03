import { useState} from 'react'
import {toast} from "react-toastify";
import {useAuthContext} from "@hooks/useAuthContext";

export const useRoleRequest = () => {

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(null)
    const [fetching, setFetching] = useState(null)
    const [request,setRequest] = useState({});
    const [requests,setRequests] = useState([]);
    const {dispatch}= useAuthContext()

    const submitRequest = async (requestedRole) => {
        setIsLoading(true)
        setError('')
        const response = await fetch(`http://localhost:3000/User/request/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ requestedRole: requestedRole.value })
        })
        const json = await response.json()

        if (json.error) {
            if(json.error==='jwt expired'){
                localStorage.removeItem('token');
                toast.dark('Please, re-sign in');
                dispatch({type:'LOGOUT'})
                setIsLoading(false)
            }
            setError(json.error)
            setIsLoading(false)
            toast.error(json.error);
        }

        if (!json.error) {
            toast.success('Your request is successfully emitted and pending an admin reply!')
            setIsLoading(false)
        }
        setIsLoading(false);
    }

    const checkRequest = async ()=> {
        setFetching(true);
        const response = await fetch(`http://localhost:3000/User/check-request`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        const json = await response.json()

        if (json.error) {
            if(json.error==='jwt expired'){
                localStorage.removeItem('token');
                toast.dark('Please, re-sign in');
                dispatch({type:'LOGOUT'})
                setFetching(false);
            }
            setError(json.error)
            setFetching(false);
            toast.error(json.error);
        }
        if (!json.error) {
            if(json.request){
                console.log(json);
                setRequest(json.request);
            }
        }
        setFetching(false);
    }

    const fetchRequests = async ()=> {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3000/User/requests`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        const json = await response.json()

        if (json.error) {
            if(json.error==='jwt expired'){
                localStorage.removeItem('token');
                toast.dark('Please, re-sign in');
                dispatch({type:'LOGOUT'})
                setIsLoading(false);
            }
            setError(json.error)
            setIsLoading(false);
            toast.error(json.error);
        }
        if (!json.error) {
            console.log(json);
            setRequests(json);
        }
        setIsLoading(false);
    }
    const acceptRequest = async (request)=> {
        setFetching(true);
        const response = await fetch(`http://localhost:3000/User/accept`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify(request)
        })
        const json = await response.json()

        if (json.error) {
            if(json.error==='jwt expired'){
                localStorage.removeItem('token');
                toast.dark('Please, re-sign in');
                dispatch({type:'LOGOUT'})
                setFetching(false);
            }
            setError(json.error)
            setFetching(false);
            toast.error(json.error);
        }
        if (!json.error) {
            console.log(json);
        }
        setFetching(false);
    }
    const rejectRequest = async (request)=> {
        setFetching(true);
        const response = await fetch(`http://localhost:3000/User/reject`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify(request)
        })
        const json = await response.json()

        if (json.error) {
            if(json.error==='jwt expired'){
                localStorage.removeItem('token');
                toast.dark('Please, re-sign in');
                dispatch({type:'LOGOUT'})
                setFetching(false);
            }
            setError(json.error)
            setFetching(false);
            toast.error(json.error);
        }
        if (!json.error) {
            console.log(json);
        }
        setFetching(false);
    }



    return { submitRequest, checkRequest, fetchRequests, acceptRequest, rejectRequest, isLoading, error,requests, request, fetching}
}