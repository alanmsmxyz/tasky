import React, { useReducer } from 'react'

import NavigationBottom from './NavigationBottom'
import ActionButton from './ActionButton'

import style from './TaskForm.module.css'

// Using sample data for demo since IndexedDB not implemented yet
import SampleData from '../utils/SampleData'

const initialState = {
    'id': null,
    'name': '',
    'description': '',
    'date': '',
    'time': '',
    'category': null
}

const reducer = ( state, { field, value } ) => {
    return {
        ...state,
        [field]: value
    }
}

const TaskForm = ( props ) => {
    const [values, dispatch] = useReducer( reducer, props.mode === 'edit' ? props.data : initialState )

    const onChange = ( e ) => {
        dispatch( {
            field: e.target.name,
            value: e.target.name === 'id' || e.target.name === 'category' ? parseInt( e.target.value ) : e.target.value
        } )
    }

    const onSubmit = ( e ) => {
        e.preventDefault()
    }

    const onDelete = ( e ) => {
        e.preventDefault()
    }


    const { id, name, description, date, time, category } = values

    return (
        <form onSubmit={onSubmit} className={style.form}>
            <div className={style.field}>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" placeholder="Put task name here..." value={name} onChange={onChange} />
            </div>

            <div className={style.field}>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" placeholder="Put task description here..." onChange={onChange} rows="5" value={description} />
            </div>

            <div className={style.field}>
                <label htmlFor="date">Date</label>
                <input id="date" name="date" type="date" placeholder="" value={date} onChange={onChange} />
            </div>

            <div className={style.field}>
                <label htmlFor="time">Time</label>
                <input id="time" name="time" type="time" placeholder="" value={time} onChange={onChange} />
            </div>

            <fieldset className={style.fieldset}>
                <legend>Category</legend>
                {
                    SampleData.category.map( cat =>
                        <div className={style.radio} key={cat.id}>
                            <input id={`cat-${cat.id}`} type="radio" name="category" value={cat.id} checked={category === cat.id} onChange={onChange} />
                            <label htmlFor={`cat-${cat.id}`} style={{ 'border-color': cat.color }}>{cat.name}</label>
                        </div>
                    )
                }
            </fieldset>

            <NavigationBottom>
                {props.mode === 'edit' &&
                    <button onClick={onDelete}>
                        <ActionButton
                            icon="/icons/trash.svg"
                            legend="delete task"
                        />
                    </button>
                }

                <button type="submit">
                    <ActionButton
                        icon="/icons/check.svg"
                        legend="save task"
                    />
                </button>
            </NavigationBottom>
        </form>
    )
}

export default TaskForm