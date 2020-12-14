import React from 'react'

import style from './NavigationBottom.module.css'

const NavigationBottom = ( props ) => {
    return (
        <div className={style.container}>
            {props.children}
        </div>
    )
}

export default NavigationBottom