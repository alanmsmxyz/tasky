import React from 'react'

import PageMeta from '../utils/PageMeta'

import TaskForm from '../components/TaskForm'
import NavigationMinimal from '../components/NavigationMinimal'

const TaskAdd = () => {
    return (
        <React.Fragment>
            <PageMeta title="Add Task | Tasky" description="Manage Your Task Easily"></PageMeta>
            <div className="content">
                <NavigationMinimal title="Add Task" />
                <TaskForm mode="add" />
            </div>
        </React.Fragment>
    )
}

export default TaskAdd