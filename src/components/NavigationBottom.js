import React, { useEffect } from 'react'

import style from './NavigationBottom.module.css'

const NavigationBottom = ( props ) => {
    useEffect( () => {
        document.getElementsByTagName( 'body' )[0].classList.add( 'clear-action-navigation' )

        return () => {
            document.getElementsByTagName( 'body' )[0].classList.remove( 'clear-action-navigation' )
        }
    }, [] )

    return (
        <div className={style.container}>
            {props.children}
        </div>
    )
}

export default NavigationBottom