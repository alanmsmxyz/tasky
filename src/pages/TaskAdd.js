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
            if ( !db.checkConnection() ) {
                await db.init()
            }

            let resultCL = await db.loadAllCategory()
            setCategoryList( resultCL )
        }
        loadData()
    }, [] )

    const handleSubmit = ( e, task ) => {
        e.preventDefault()

        db.addTask( task ).then( () => {
            history.push('/')
        } ).catch( ( e ) => {
            console.log( e.message )
        } )
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