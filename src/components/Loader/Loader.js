import React from 'react'

import {Dot, Dots, Preloader,} from './Loader.styles'


export default function Loader() {
    return (
        <>
            <Preloader>
                <Dots>
                    <Dot dot='1'/>
                    <Dot dot='2'/>
                    <Dot dot='3'/>
                    <Dot dot='4'/>
                    <Dot dot='5'/>
                </Dots>
            </Preloader>
        </>
    )
}
