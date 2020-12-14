import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import TaskForm from '../components/TaskForm'

import * as db from '../models/db'

const TaskEdit = () => {
    const history = useHistory()

    const { id } = useParams()
    const [task, setTask] = useState( null )
    const [categoryList, setCategoryList] = useState( null )

    useEffect( () => {
        const loadData = async () => {
            let resultT = {}
            let resultCL = []

            try {
                if ( !db.checkConnection() ) {
                    await db.init()
                }

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

        id && loadData()
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
        <>
            { task && categoryList &&
                <TaskForm task={task} categoryList={categoryList} submitHandler={handleSubmit} deleteHandler={handleDelete} showDeleteButton={true} />
            }
        </>
    )
}

export default TaskEdit