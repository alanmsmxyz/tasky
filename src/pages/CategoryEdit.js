import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import PageMeta from '../utils/PageMeta'

import NavigationTop from '../components/NavigationTop'
import CategoryForm from '../components/CategoryForm'

import * as db from '../models/db'

const CategoryEdit = () => {
    const history = useHistory()

    const { id } = useParams()
    const [category, setCategory] = useState( [] )

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

        loadData()
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
            await db.removeCategory( parseInt( id ) )
            history.push( '/category' )
        } catch ( e ) {
            console.error( e.message )
        }
    }

    return (
        <React.Fragment>
            <PageMeta title="Edit Category | Tasky" description="Manage Your Task Easily"></PageMeta>

            <NavigationTop title="Edit Category" previousPage='/category' />

            <div className="content">
                <CategoryForm category={category} submitHandler={handleSubmit} deleteHandler={handleDelete} showDeleteButton={true} />
            </div>
        </React.Fragment>
    )
}

export default CategoryEdit