import React from 'react'
import { useHistory } from 'react-router-dom'

import NavigationTop from '../components/NavigationTop'
import CategoryForm from '../components/CategoryForm'

import * as db from '../models/db'

import PageMeta from '../utils/PageMeta'

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
        <React.Fragment>
            <PageMeta title="Add Category | Tasky" description="Manage Your Task Easily"></PageMeta>
        
            <NavigationTop title="Add Category" previousPage='/category' />

            <div className="content">
                <CategoryForm submitHandler={handleSubmit} />
            </div>
        </React.Fragment>
    )
}

export default CategoryAdd