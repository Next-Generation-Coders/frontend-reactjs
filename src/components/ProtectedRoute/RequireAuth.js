import { useLocation, Navigate, Outlet } from "react-router-dom"
import {useAuthContext} from "@hooks/useAuthContext";



const RequireAuth = ({allowedRoles})=>{
    const {USER} = useAuthContext();
    const location = useLocation()

    return (
        USER ?
            allowedRoles ?
            USER.roles.find(r=>allowedRoles?.includes(r)) ?
            <Outlet/>
            :
                <Navigate to="/unauthorized" state={{from: location}} replace />

            :
                <Outlet/>
            :
            <Navigate to="/login" state={{from: location}} replace/>
    )

}


export default RequireAuth