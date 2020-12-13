import React from 'react'
import { useHistory } from 'react-router-dom'

import CategoryForm from '../components/CategoryForm'
import NavigationMinimal from '../components/NavigationMinimal'

import * as db from '../models/db'

import PageMeta from '../utils/PageMeta'

const CategoryAdd = () => {
    const history = useHistory()

    const handleSubmit = async ( e, category ) => {
        e.preventDefault()

        if ( !db.checkConnection() ) {
            await db.init()
        }

        db.addCategory( category ).then( () => {
            history.push('/category')
        } ).catch( ( e ) => {
            console.log( e.message )
        } )
    }

    return (
        <React.Fragment>
            <PageMeta title="Add Category | Tasky" description="Manage Your Task Easily"></PageMeta>
            <div className="content">
                <NavigationMinimal title="Add Category" />
                <CategoryForm submitHandler={handleSubmit} />
            </div>
        </React.Fragment>
    )
}

export default CategoryAdd