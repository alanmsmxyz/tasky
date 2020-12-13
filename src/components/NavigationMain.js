import React from 'react'
import { Link } from 'react-router-dom'

import style from './NavigationMain.module.css'

const NavigationMain = () => {
    return (
        <nav id="main-navigation" className={style.container}>
            <div className={style.inner}>
                <div className={style.branding}>
                    <h1>Tasky</h1>
                    <p>Here are your task list...</p>
                </div>
                <div>
                    <Link className={style.stairs} to="/category">
                        <span className={style.bar} />
                        <span className={style.bar} />
                        <span className={style.bar} />
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default NavigationMain