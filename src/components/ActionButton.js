import React from 'react'

import style from './ActionButton.module.css'

const ActionButton = ( props ) => {
    return (
        <div className={style.container}>
            <div className={`${style.icon} inline-flex-center`}>
                <img src={props.icon} alt={props.legend} />
            </div>
            <div className={style.legend}>
                <small>{props.legend}</small>
            </div>
        </div>
    )
}

export default ActionButton