import {createContext, useEffect, useReducer} from 'react'
import  { jwtDecode }  from 'jwt-decode';

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { USER: action.payload }
        case 'LOGOUT':
            return { USER: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    let u = null;
    if(localStorage.getItem('token')){
        const token = localStorage.getItem('token')
            const decodedToken = jwtDecode(token);
        u = decodedToken.user
    }
    const [state, dispatch] = useReducer(authReducer, {
       USER : u
    })
    useEffect(() => {
            if(localStorage.getItem('token')){
                const token = localStorage.getItem('token')
                const decodedToken = jwtDecode(token);
                const USER = decodedToken.user;
                if (USER) {
                    dispatch({ type: 'LOGIN', payload: USER })
                }
            }
            if(!localStorage.getItem('token')){
                dispatch({type:'LOGOUT',payload:null})
            }
        }, []
    )

    console.log('AuthContext state:', state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )

}