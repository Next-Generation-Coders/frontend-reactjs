import {useAuthContext} from './useAuthContext'
import {toast} from "react-toastify";

export const useLogout = ()=>{
    const {dispatch} = useAuthContext();

    const logout= () =>{

        localStorage.removeItem('token');
        toast.dark('See you next time!');
        dispatch({type:'LOGOUT'})
    }

    return {logout}
}