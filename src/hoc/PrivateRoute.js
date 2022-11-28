// import React, { useEffect } from 'react'
import React from 'react'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'

export default function PrivateRoute({children}) {
    const auth = useSelector(state => state.authReducer)
    console.log(`XXX auth PrivateRoute: ${JSON.stringify(auth.isAuthenticated)}`)

    if (auth.isAuthenticated) {
        return (
            <>
                {children}
            </>
        )
    } else {
        return (
            <>
                {
                    React.Children.map(children, child => (
                        <div>
                            <Navigate to="/login"/>
                        </div>
                    ))
                }
            </>
        )
    }
}