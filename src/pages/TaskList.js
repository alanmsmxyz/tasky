import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import NavigationBottom from '../components/NavigationBottom'
import TaskCard from '../components/TaskCard'
import ActionButton from '../components/ActionButton'

import * as db from '../models/db'

const TaskList = () => {
    const [taskCards, setTaskCards] = useState( null )

    useEffect( () => {
        const loadData = async () => {
            let resultTL
            let resultCL

            try {
                if ( !db.checkConnection() ) {
                    let init = await db.init()
                    console.log( init )
                }

                resultTL = await db.loadAllTask()
                resultCL = await db.loadAllCategory()
            } catch ( e ) {
                console.error( e )
            }

            let result = resultTL.map( task => {
                const category = resultCL.find( cat => {
                    return cat.id === task.category
                } )

                task.category = category
                task.datetime = new Date( `${task.date} ${task.time}` ).toLocaleTimeString( undefined, {
                    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                } )
    

                return (
                    <Link key={task.id} to={`/view-task/${task.id}`} className="blocklink">
                        <TaskCard
                            {...task}
                        />
                    </Link>
                )
            } )

            setTaskCards( result )
        }
        loadData()
    }, [] )

    return (
        <>
            {taskCards && taskCards.length > 0 ? taskCards :
                <p>It seems you doesn't have any task yet, you can create one using the button on the bottom right of your screen.</p>
            }

            <NavigationBottom>
                <Link to="/add-task">
                    <ActionButton
                        icon="/icons/plus.svg"
                        legend="add task"
                    />
                </Link>
            </NavigationBottom>
        </>
    )
}

export default TaskList