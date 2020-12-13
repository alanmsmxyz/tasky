import React from 'react'

import style from './CategoryCard.module.css'

const CategoryCard = ( props ) => {
    return (
        <div className={style.container}>
            <div className={style.inner}>
                <div>
                    <div className={style.color} style={{ background: props.color }} />
                </div>
                <div>
                    <span className={style.name}>{props.name}</span>
                </div>
            </div>
        </div >
    )
}

export default CategoryCard