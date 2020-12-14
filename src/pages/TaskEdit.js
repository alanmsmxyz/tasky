import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import PageMeta from '../utils/PageMeta'

import TaskForm from '../components/TaskForm'
import NavigationTop from '../components/NavigationTop'

import * as db from '../models/db'

const TaskEdit = () => {
    const history = useHistory()

    const { id } = useParams()
    const [task, setTask] = useState( {} )
    const [categoryList, setCategoryList] = useState( [] )

    useEffect( () => {
        const loadData = async () => {
            let resultT = {}
            let resultCL = []

            try {
                if ( !db.checkConnection() ) {
                    await db.init()
                }

                // do the queries in parallel
                let resT = db.loadTask( parseInt( id ) )
                let resCL = db.loadAllCategory()
                resultT = await resT
                resultCL = await resCL
            } catch ( e ) {
                console.error( e.message )
            }

            setTask( resultT )
            setCategoryList( resultCL )
        }

        
        loadData()
    }, [id] )

    const handleSubmit = async ( e, task ) => {
        e.preventDefault()

        try {
            await db.updateTask( task )
            history.push( `/view-task/${task.id}` )
        } catch ( e ) {
            console.error( e.message )
        }
    }

    const handleDelete = async ( e ) => {
        e.preventDefault()

        try {
            await db.removeTask( parseInt( id ) )
            history.push( '/' )
        } catch ( e ) {
            console.error( e.message )
        }
    }

    return (
        <React.Fragment>
            <PageMeta title="Edit Task | Tasky" description="Manage Your Task Easily"></PageMeta>

            <NavigationTop title="Edit Task" previousPage={`/view-task/${id}`} />

            <div className="content">
                <TaskForm task={task} categoryList={categoryList} submitHandler={handleSubmit} deleteHandler={handleDelete} showDeleteButton={true} />
            </div>
        </React.Fragment>
    )
}

export default TaskEdit