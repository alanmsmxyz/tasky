import React from 'react'
import { Link } from 'react-router-dom'

import style from './TaskCard.module.css'

const TaskCard = ( props ) => {
    return (
        <div className={style.container}>
            <Link className={style.link} to={`/view-task/${props.id}`} >
                <div>
                    <h2 className={style.name}>{props.name}</h2>
                </div>
                <div>
                    <p className={style.description}>{props.description}</p>
                </div>
            </Link>
            <div className={style.footer}>
                <div className={style.datetime}>{`${props.date} ${props.time}`}</div>
                <div className={style.category} style={{ color: props.categoryColor }}>{props.categoryName}</div>
            </div>
        </div>
    )
}

export default TaskCard