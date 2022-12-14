import React, {useEffect, useState} from 'react'
import GlobalStyle from '../globalStyles'
import {useDispatch, useSelector} from 'react-redux'
import {checkAuthenticated, loadUser} from '../redux'
import PrivateComponent from './PrivateComponent'
import GuestComponent from './GuestComponent'
import AlertComponent from '../components/Alert/AlertComponent'
import Loader from '../components/Loader/Loader'

export default function Layout({children}) {
    let width = window.innerWidth
    const [show, setShow] = useState(width > 748)
    const [smallDevice, setSmallDevice] = useState(width <= 748)
    let darkMd = localStorage.getItem('darkMode')
    const [darkMode, setDarkMode] = useState(darkMd == null ? true : JSON.parse(darkMd))

    const loader = useSelector(state => state.loaderReducer)

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode)
    }, [darkMode])

    const toggleDash = () => {
        setShow(!show)
    }

    const toggleDashOnSmallDevice = () => {
        if (smallDevice) {
            setShow(!show)
        }
    }


    window.addEventListener('resize', () => {
        let width = window.innerWidth
        if (width <= 748) {
            setSmallDevice(true)
            setShow(false)
        } else {
            setSmallDevice(false)
            setShow(true)
        }
    })


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(checkAuthenticated())
        dispatch(loadUser())
    }, [])
    return (
        <>

            <GlobalStyle darkMode={darkMode}/>
            < AlertComponent/>
            {
                loader.loader ?
                    <Loader/> : ''
            }

            <PrivateComponent>
                {/*<Wraper>*/}
                {/*    <Dashboard toggleDashOnSmallDevice={toggleDashOnSmallDevice} show={show}/>*/}

                {/*    <Container onClick={() => smallDevice && show ? setShow(false) : null} smallDevice={smallDevice}*/}
                {/*               show={show}>*/}
                {/*        <Nbob setDarkMode={setDarkMode} darkMode={darkMode} toggleDash={toggleDash}/>*/}
                        {children}
                    {/*</Container>*/}
                {/*</Wraper>*/}
            </PrivateComponent>
            <GuestComponent>
                {children}
            </GuestComponent>
        </>
    )
}
