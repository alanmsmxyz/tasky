import React from 'react'
import { useHistory } from 'react-router-dom'

import CategoryForm from '../components/CategoryForm'

import * as db from '../models/db'

const CategoryAdd = () => {
    const history = useHistory()

    const handleSubmit = async ( e, category ) => {
        e.preventDefault()

        try {
            if ( !db.checkConnection() ) {
                await db.init()
            }

            await db.addCategory( category )
            history.push( '/category' )
        } catch ( e ) {
            console.error( e.message )
        }
    }

    return (
        <CategoryForm submitHandler={handleSubmit} />
    )
}

export default CategoryAdd