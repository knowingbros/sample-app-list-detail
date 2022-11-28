import React from 'react'
import {AlertClose, AlertCompo, AlertCont, AlertText} from './Alert.styles'
import {IoCloseSharp} from 'react-icons/io5'
import {useDispatch, useSelector} from 'react-redux'
import {removeAlert} from '../../redux'

export default function AlertComponent() {
    const alerts = useSelector(state => state.alertReducer)
    const dispatch = useDispatch()
    return (
        <>
            <AlertCont>
                {
                    alerts.map(({message, alertType, id}) => {
                        return (
                            <AlertCompo key={id} alertType={alertType}>
                                <AlertText alertType={alertType}>{message}</AlertText>
                                <AlertClose alertType={alertType} onClick={() => dispatch(removeAlert(id))}>
                                    <IoCloseSharp/>
                                </AlertClose>
                            </AlertCompo>
                        )
                    })
                }


            </AlertCont>

        </>
    )
}
