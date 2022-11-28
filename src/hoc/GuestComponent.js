import React from 'react'
import {useSelector} from 'react-redux'

export default function PrivateComponent({children}) {
    const auth = useSelector(state => state.authReducer)

    if (!auth.isAuthenticated) {
        return (
            <>
                {children}
            </>
        )
    } else {
        return (
            <>

            </>
        )
    }
}
