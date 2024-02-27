import {useAuthContext} from './useAuthContext'
import {toast} from "react-toastify";

export const useLogout = ()=>{
    const {dispatch} = useAuthContext();

    const logout= () =>{

        localStorage.removeItem('user');
        toast.dark('See you next time!');
        dispatch({type:'LOGOUT'})
    }

    return {logout}
}