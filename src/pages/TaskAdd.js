import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import TaskForm from '../components/TaskForm'

import * as db from '../models/db'

const TaskAdd = () => {
    const history = useHistory()
    const [categoryList, setCategoryList] = useState( null )

    useEffect( () => {
        const loadData = async () => {
            let result = []
            try {
                if ( !db.checkConnection() ) {
                    await db.init()
                }

                result = await db.loadAllCategory()
            } catch ( e ) {
                console.error( e.message )
            }
            setCategoryList( result )
        }

        loadData()
    }, [] )

    const handleSubmit = async ( e, task ) => {
        e.preventDefault()

        try {
            let res = await db.addTask( task )
            history.push( `/view-task/${res.id}` )
        } catch ( e ) {
            console.error( e.message )
        }
    }

    return (
        <>
            { categoryList &&
                <TaskForm categoryList={categoryList} submitHandler={handleSubmit} />
            }
        </>
    )
}

export default TaskAdd