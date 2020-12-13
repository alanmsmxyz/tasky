import React from 'react'
import { Link } from 'react-router-dom'

import style from './NavigationMinimal.module.css'

const NavigationMinimal = ( props ) => {
    return (
        <div className={style.container}>
            <div className={style.inner}>
                <div>
                    <Link to="/" className={style.back}>
                        <img src="/icons/chevron-left.svg" alt="back icon"/>
                    </Link>
                </div>

                <div>
                    <h1 className={style.title}>{props.title}</h1>
                </div>
            </div>
        </div>
    )
}

export default NavigationMinimal