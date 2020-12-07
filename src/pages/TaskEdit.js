import React from 'react'
import { useParams } from 'react-router-dom'

import PageMeta from '../utils/PageMeta'

import TaskForm from '../components/TaskForm'
import NavigationMinimal from '../components/NavigationMinimal'

// Using sample data for demo since IndexedDB not implemented yet
import SampleData from '../utils/SampleData'

const TaskEdit = () => {
    const { id } = useParams()

    // Gather desired data from SampleData
    let task = SampleData.task.find( ( task ) => {
        return task.id === parseInt( id )
    } )

    return (
        <React.Fragment>
            <PageMeta title="Edit Task | Tasky" description="Manage Your Task Easily"></PageMeta>
            <div className="content">
                <NavigationMinimal title="Edit Task" />
                <TaskForm mode="edit" data={task} />
            </div>
        </React.Fragment>
    )
}

export default TaskEdit