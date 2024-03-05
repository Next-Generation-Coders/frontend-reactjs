import {createContext, useEffect, useReducer} from 'react'

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
    let u= null;
    if(localStorage.getItem('user')){
        u = JSON.parse(localStorage.getItem('user'))
    }
    const [state, dispatch] = useReducer(authReducer, {
        USER: u
    })
    useEffect(() => {

            if(JSON.parse(localStorage.getItem('user'))){
                const USER = JSON.parse(localStorage.getItem('user'));
                if (USER) {
                    dispatch({ type: 'LOGIN', payload: USER })
                }
            }
            if(!JSON.parse(localStorage.getItem('user'))){
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