import React, { useReducer, useEffect } from 'react'
import { Link } from 'react-router-dom'

import NavigationBottom from './NavigationBottom'
import ActionButton from './ActionButton'

import style from './Form.module.css'

// create a reducer function to handle form input value change
const reducer = ( state, { field, value } ) => {
    return {
        ...state,
        [field]: value
    }
}

const taskModel = {
    'name': '',
    'description': '',
    'date': '',
    'time': '',
    'category': null,
    'notified': false
}

const TaskForm = ( props ) => {
    // useReducer to handle input form value
    const [values, dispatch] = useReducer( reducer, props.task ?? taskModel )
    const onChange = ( e ) => {
        dispatch( {
            field: e.target.name,
            value: e.target.name === 'id' || e.target.name === 'category' ? parseInt( e.target.value ) : e.target.value
        } )
    }

    useEffect( () => {
        if ( props.task ) {
            for ( let key in props.task ) {
                dispatch( { field: key, value: props.task[key] } )
            }
        }
    }, [props] )

    // handle form submit
    const onSubmit = ( e ) => {
        const task = values

        props.submitHandler( e, task )
    }

    // handle delete task button click
    const onDelete = !props.showDeleteButton ? null : ( e ) => {
        props.deleteHandler( e )
    }

    const { name, description, date, time, category } = values

    const categoryRadios = props.categoryList.map( cat =>
        <div className={style.radio} key={cat.id}>
            <input id={`cat-${cat.id}`} type="radio" name="category" value={cat.id} checked={category === cat.id} onChange={onChange} required />
            <label htmlFor={`cat-${cat.id}`} style={{ 'borderColor': cat.color }}>
                <big>{cat.name}</big>
            </label>
        </div> )

    return (
        <form onSubmit={onSubmit} className={style.form}>
            <div className={style.field}>
                <label htmlFor="name">
                    <b><small>Name</small></b>
                </label>
                <input id="name" name="name" type="text" placeholder="Put task name here..." value={name} onChange={onChange} required />
            </div>

            <div className={style.field}>
                <label htmlFor="description">
                    <b><small>Description</small></b>
                </label>
                <textarea id="description" name="description" placeholder="Put task description here..." onChange={onChange} rows="5" value={description} required />
            </div>

            <div className={style.field}>
                <label htmlFor="date">
                    <b><small>Date</small></b>
                </label>
                <input id="date" name="date" type="date" placeholder="" value={date} onChange={onChange} required />
            </div>

            <div className={style.field}>
                <label htmlFor="time">
                    <b><small>Time</small></b>
                </label>
                <input id="time" name="time" type="time" placeholder="" value={time} onChange={onChange} required />
            </div>

            <fieldset className={style.fieldset}>
                <legend><b><small>Category</small></b></legend>
                {props.categoryList.length > 0 ? categoryRadios :
                <p>It seems you doesn't have any category yet, you need to create one <Link className="hyperlink" to="/category">here</Link>.</p>}
            </fieldset>

            <NavigationBottom>
                {props.showDeleteButton &&
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