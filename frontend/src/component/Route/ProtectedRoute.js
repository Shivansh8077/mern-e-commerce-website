import React, {Fragment} from 'react';
import {useSelector} from "react-redux";
import {Navigate, Route} from "react-router-dom";


const ProtectedRoute = ({element:element,...rest }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    return (
        <Fragment>
            {!loading && (
                <Route
                    {...rest}
                    render={(props) => {
                        if (!isAuthenticated) {
                            return <Navigate to="/login" />;
                        }

                        // if (isAdmin === true && user.role !== "admin") {
                        //     return <Redirect to="/login" />;
                        // }

                        return <element {...props} />;
                    }}
                />
            )}
        </Fragment>
    );
};

export default ProtectedRoute;
