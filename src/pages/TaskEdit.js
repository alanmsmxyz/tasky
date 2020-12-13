import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import PageMeta from '../utils/PageMeta'

import TaskForm from '../components/TaskForm'
import NavigationMinimal from '../components/NavigationMinimal'

import * as db from '../models/db'

const TaskEdit = () => {
    const history = useHistory()

    const { id } = useParams()
    const [task, setTask] = useState( {} )
    const [categoryList, setCategoryList] = useState( [] )

    useEffect( () => {
        const loadData = async () => {
            if ( !db.checkConnection() ) {
                await db.init()
            }

            let resultTask = await db.loadTask( parseInt( id ) )
            let resultCL = await db.loadAllCategory()
            setTask( resultTask )
            setCategoryList( resultCL )
        }
        loadData()
    }, [id] )

    const handleSubmit = async ( e, task ) => {
        e.preventDefault()

        db.updateTask( task ).then( () => {
            history.push(`/view-task/${task.id}`)
        } ).catch( ( e ) => {
            console.log( e.message )
        } )
    }

    const handleDelete = async ( e ) => {
        e.preventDefault()
    }

    return (
        <React.Fragment>
            <PageMeta title="Edit Task | Tasky" description="Manage Your Task Easily"></PageMeta>
            <div className="content">
                <NavigationMinimal title="Edit Task" />
                <TaskForm task={task} categoryList={categoryList} submitHandler={handleSubmit} deleteHandler={handleDelete} showDeleteButton={true} />
            </div>
        </React.Fragment>
    )
}

export default TaskEdit