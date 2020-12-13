import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import PageMeta from '../utils/PageMeta'

import NavigationMinimal from '../components/NavigationMinimal'
import NavigationBottom from '../components/NavigationBottom'
import CategoryCard from '../components/CategoryCard'
import ActionButton from '../components/ActionButton'

import * as db from '../models/db'

const CategoryList = () => {
    const [categoryList, setCategoryList] = useState( [] )
    useEffect( () => {
        const loadData = async () => {
            if ( !db.checkConnection() ) {
                await db.init()
            }

            let result = await db.loadAllCategory()

            setCategoryList( result )
        }
        loadData()
    }, [] )

    const categoryCards = categoryList.map( category => {
        return (
            <Link to={`/edit-category/${category.id}`}>
                <CategoryCard {...category} />
            </Link>
        )
    } )

    return (
        <React.Fragment>
            <PageMeta name="Manage Category | Tasky" description="Manage Your Task Easily"></PageMeta>
            <div className="content">

                <NavigationMinimal title="Category List" />

                {categoryCards.length > 0 ? categoryCards :
                <p>It seems you doesn't have any category yet, you can create one using the button on the bottom right of your screen.</p>}

                <NavigationBottom>
                    <Link to="/add-category">
                        <ActionButton
                            icon="/icons/plus.svg"
                            legend="add category"
                        />
                    </Link>
                </NavigationBottom>

            </div>
        </React.Fragment>
    )
}

export default CategoryList