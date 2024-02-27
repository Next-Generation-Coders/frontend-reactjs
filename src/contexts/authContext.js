import { createContext, useReducer, useEffect } from 'react'

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
    const [state, dispatch] = useReducer(authReducer, {
        USER: null
    })

    useEffect(() => {
        const USER = JSON.parse(localStorage.getItem('user'))

        if (USER) {
            dispatch({ type: 'LOGIN', payload: USER })
        }
    }, [])

    console.log('AuthContext state:', state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )

}