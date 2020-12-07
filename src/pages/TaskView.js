import React from 'react'
import { useParams, Link } from 'react-router-dom'

import NavigationMinimal from '../components/NavigationMinimal'
import NavigationBottom from '../components/NavigationBottom'
import ActionButton from '../components/ActionButton'

import PageMeta from '../utils/PageMeta'

// Using sample data for demo since IndexedDB not implemented yet
import SampleData from '../utils/SampleData'

const TaskView = () => {
    const { id } = useParams()

    let task = SampleData.task.find( ( task ) => {
        return task.id === parseInt( id )
    } )

    const category = SampleData.category.find( cat => {
        return cat.id === task.category
    } )

    task.category_name = category.name
    task.category_color = category.color

    return (
        <React.Fragment>
            <PageMeta title="View Task | Tasky" description="Manage Your Task Easily"></PageMeta>
            <div className="content">
                <NavigationMinimal title="View Task" />

                <div>
                    <h2>{task.name}</h2>
                    <p>{task.description}</p>
                    <br />
                    <p><b>Due Date: </b>{`${task.date} - ${task.time}`}</p>
                    <p><b>Category: </b><span style={{ color: task.category_color }}>{task.category_name}</span></p>
                </div>

                <NavigationBottom>
                    <Link to={`/edit-task/${task.id}`}>
                        <ActionButton
                            icon="/icons/edit.svg"
                            legend="edit task"
                        />
                    </Link>
                </NavigationBottom>
            </div>
        </React.Fragment>
    )
}

export default TaskView