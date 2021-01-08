import React, { useReducer, useEffect } from 'react'

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

const categoryModel = {
    'name': '',
    'color': '#000000',
    'isActive': true
}

const CategoryForm = ( props ) => {
    // useReducer to handle input form value
    const [values, dispatch] = useReducer( reducer, props.category ?? categoryModel )
    const onChange = ( e ) => {
        dispatch( {
            field: e.target.name,
            value: e.target.name === 'id' || e.target.name === 'category' ? parseInt( e.target.value ) : e.target.value
        } )
    }

    useEffect( () => {
        if ( props.category ) {
            for ( let key in props.category ) {
                dispatch( { field: key, value: props.category[key] } )
            }
        }
    }, [props] )

    // handle form submit
    const onSubmit = ( e ) => {
        const category = values

        props.submitHandler( e, category )
    }

    // handle delete task button click
    const onDelete = !props.showDeleteButton ? null : ( e ) => {
        props.deleteHandler( e )
    }

    const { name, color } = values

    return (
        <form onSubmit={onSubmit} className={style.form}>
            <div className={style.field}>
                <label htmlFor="name">
                    <b><small>Name</small></b>
                </label>
                <input id="name" name="name" type="text" placeholder="Put category name here..." value={name} onChange={onChange} required />
            </div>

            <div className={style.field}>
                <label htmlFor="color">
                    <b><small>Color</small></b>
                </label>
                <input id="color" name="color" type="color" onChange={onChange} value={color} required />
            </div>

            <NavigationBottom>
                {props.showDeleteButton &&
                    <button onClick={onDelete}>
                        <ActionButton
                            icon="/icons/trash.svg"
                            legend="delete category"
                        />
                    </button>
                }

                <button type="submit">
                    <ActionButton
                        icon="/icons/check.svg"
                        legend="save category"
                    />
                </button>
            </NavigationBottom>
        </form>
    )
}

export default CategoryForm