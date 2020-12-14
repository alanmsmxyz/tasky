import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import NavigationBottom from '../components/NavigationBottom'
import CategoryCard from '../components/CategoryCard'
import ActionButton from '../components/ActionButton'

import * as db from '../models/db'

const CategoryList = () => {
    const [categoryCards, setCategoryCards] = useState( null )
    useEffect( () => {
        const loadData = async () => {
            let result
            try {
                if ( !db.checkConnection() ) {
                    await db.init()
                }

                result = await db.loadAllCategory()
            } catch ( e ) {
                console.error( e )
            }


            result = result.map( category => {
                return (
                    <Link key={category.id} to={`/edit-category/${category.id}`}>
                        <CategoryCard {...category} />
                    </Link>
                )
            } )
            
            setCategoryCards( result )
        }

        loadData()
    }, [] )


    return (
        <>
            {categoryCards && categoryCards.length > 0 ? categoryCards :
                <p>It seems you doesn't have any category yet, you can create one using the button on the bottom right of your screen.</p>}

            <NavigationBottom>
                <Link to="/add-category">
                    <ActionButton
                        icon="/icons/plus.svg"
                        legend="add category"
                    />
                </Link>
            </NavigationBottom>
        </>
    )
}

export default CategoryList