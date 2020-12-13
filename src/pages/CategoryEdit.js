import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import PageMeta from '../utils/PageMeta'

import CategoryForm from '../components/CategoryForm'
import NavigationMinimal from '../components/NavigationMinimal'

import * as db from '../models/db'

const CategoryEdit = () => {
    const history = useHistory()

    const { id } = useParams()
    const [category, setCategory] = useState( [] )

    useEffect( () => {
        const loadData = async () => {
            if ( !db.checkConnection() ) {
                await db.init()
            }

            let result = await db.loadCategory( parseInt( id ) )
            setCategory( result )
        }
        loadData()
    }, [id] )

    const handleSubmit = async ( e, category ) => {
        e.preventDefault()

        db.updateCategory( category ).then( () => {
            history.push( '/category' )
        } ).catch( ( e ) => {
            console.log( e.message )
        } )
    }

    const handleDelete = async ( e ) => {
        e.preventDefault()
    }

    return (
        <React.Fragment>
            <PageMeta title="Edit Category | Tasky" description="Manage Your Task Easily"></PageMeta>
            <div className="content">
                <NavigationMinimal title="Edit Category" />
                <CategoryForm category={category} submitHandler={handleSubmit} deleteHandler={handleDelete} showDeleteButton={true} />
            </div>
        </React.Fragment>
    )
}

export default CategoryEdit