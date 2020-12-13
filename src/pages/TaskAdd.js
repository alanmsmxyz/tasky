import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import TaskForm from '../components/TaskForm'
import NavigationMinimal from '../components/NavigationMinimal'

import * as db from '../models/db'

import PageMeta from '../utils/PageMeta'

const TaskAdd = () => {
    const history = useHistory()
    const [categoryList, setCategoryList] = useState( [] )

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
        <React.Fragment>
            <PageMeta title="Add Task | Tasky" description="Manage Your Task Easily"></PageMeta>
            <div className="content">
                <NavigationMinimal title="Add Task" />
                <TaskForm categoryList={categoryList} submitHandler={handleSubmit} />
            </div>
        </React.Fragment>
    )
}

export default TaskAdd