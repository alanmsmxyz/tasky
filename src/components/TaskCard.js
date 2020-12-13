import React from 'react'

import style from './TaskCard.module.css'

const TaskCard = ( props ) => {
    const datetime = new Date( `${props.date} ${props.time}` ).toLocaleString( undefined, {
        weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'
    } )
    return (
        <div className={style.container}>
                <div className={style.inner}>
                    <div className={style.snippet}>
                        <div>
                            <h2 className={style.title}>{props.name}</h2>
                            <p className={style.description}>{props.description}</p>
                            <p className={style.datetime}>
                                <small>{datetime}</small>
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className={style.category} style={{ background: props.category.color }}></div>
                    </div>
                </div>
        </div>
    )
}

export default TaskCard