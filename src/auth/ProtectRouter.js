import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRouter({ component: Component, ...rest }) {
    // console.log(localStorage.getItem('user'))
    return (
        <Route
            {...rest}
            render={(props) => {
                if (localStorage && localStorage.getItem('user')) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                    );
                }
            }}
        />
    );
}
