import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux';
import {hideLoader, showLoader} from '../../redux/loader/actions';
import axios from 'axios'
import alert from '../../redux/alert/actions';
import {useNavigate, useParams} from "react-router-dom";
import {API_ROOT_URL} from "../../api/constants";

export default function Activate({match}) {
    let navigate = useNavigate();
    let {uid, token} = useParams();

    const dispatch = useDispatch()
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    const body = JSON.stringify({uid, token})
    useEffect(() => {
        dispatch(showLoader())
        axios.post(`${API_ROOT_URL}auth/users/activation/`, body, config)
            .then((response) => {
                if (response.status === 204) {
                    dispatch(hideLoader())
                    dispatch(alert('Your account is successfully activated!', 'success'))
                    return navigate("/login/")
                }

            }).catch((error) => {
            dispatch(hideLoader())
            dispatch(alert(`Failed to activate your account - Error: ${error}`, 'danger'))
        })
    }, [])
    return (
        <>

        </>
    )
}
