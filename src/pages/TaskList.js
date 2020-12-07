import React from 'react'
import { Link } from 'react-router-dom'

import PageMeta from '../utils/PageMeta'

import NavigationMain from '../components/NavigationMain'
import NavigationBottom from '../components/NavigationBottom'
import TaskCard from '../components/TaskCard'
import ActionButton from '../components/ActionButton'

// Using sample data for demo since IndexedDB not implemented yet
import SampleData from '../utils/SampleData'

const TaskList = () => {
    const taskList = SampleData.task.map( task => {
        const category = SampleData.category.find( cat => {
            return cat.id === task.category
        } )

        return {
            ...task,
            'category_name': category.name,
            'category_color': category.color
        }
    }
    )

    const taskCards = taskList.map( task =>
        <TaskCard
            key={task.id}
            id={task.id}
            name={task.name}
            description={task.description}
            date={task.date}
            time={task.time}
            categoryName={task.category_name}
            categoryColor={task.category_color}
        />
    )

    return (
        <React.Fragment>
            <PageMeta name="Manage Tasks | Tasky" description="Manage Your Task Easily"></PageMeta>
            <div className="content">

                <NavigationMain />

                {taskCards}

                <NavigationBottom>
                    <Link to="/add-task">
                        <ActionButton
                            icon="/icons/plus.svg"
                            legend="add task"
                        />
                    </Link>
                </NavigationBottom>

            </div>
        </React.Fragment>
    )
}

export default TaskList