import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import CategoryForm from '../components/CategoryForm'

import * as db from '../models/db'

const CategoryEdit = () => {
    const history = useHistory()

    const { id } = useParams()
    const [category, setCategory] = useState( null )

    useEffect( () => {
        const loadData = async () => {
            let result = {}
            try {
                if ( !db.checkConnection() ) {
                    await db.init()
                }

                result = await db.loadCategory( parseInt( id ) )
            } catch ( e ) {
                console.error( e.message )
            }

            setCategory( result )
        }

        id && loadData()
    }, [id] )

    const handleSubmit = async ( e, category ) => {
        e.preventDefault()

        try {
            await db.updateCategory( category )
            history.push( '/category' )
        } catch ( e ) {
            console.error( e.message )
        }
    }

    const handleDelete = async ( e ) => {
        e.preventDefault()

        try {
            await db.disableCategory( category )
            history.push( '/category' )
        } catch ( e ) {
            console.error( e.message )
        }
    }

    return (
        <>
            { category &&
                <CategoryForm category={category} submitHandler={handleSubmit} deleteHandler={handleDelete} showDeleteButton={true} />
            }
        </>
    )
}

export default CategoryEdit