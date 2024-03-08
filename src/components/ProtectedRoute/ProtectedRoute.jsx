import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useAuthContext} from "@hooks/useAuthContext";

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
    const { USER } = useAuthContext();

    return (
        <Route
            {...rest}
            render={(props) =>
                USER && allowedRoles.includes(USER.roles[0]) ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/unauthorized" />
                )
            }
        />
    );
};

export default ProtectedRoute;