import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import NavigationMinimal from '../components/NavigationMinimal'
import NavigationBottom from '../components/NavigationBottom'
import ActionButton from '../components/ActionButton'
import CategoryCard from '../components/CategoryCard'

import PageMeta from '../utils/PageMeta'

import * as db from '../models/db'

const TaskView = () => {
    const { id } = useParams()
    const [task, setTask] = useState( {} )
    const [category, setCategory] = useState( {} )

    useEffect( () => {
        const loadData = async () => {
            let resultT = {}
            let resultC = {}

            try {
                if ( !db.checkConnection() ) {
                    await db.init()
                }

                resultT = await db.loadTask( parseInt( id ) )
                resultC = await db.loadCategory( parseInt( resultT.category ) )
            } catch ( e ) {
                console.error( e.message )
            }

            setTask( resultT )
            setCategory( resultC )
        }
        
        loadData()
    }, [id] )


    const datetime = new Date( `${task.date} ${task.time}` ).toLocaleString( undefined, {
        weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'
    } )

    return (
        <React.Fragment>
            <PageMeta title="View Task | Tasky" description="Manage Your Task Easily"></PageMeta>
            <div className="content">
                <NavigationMinimal title="View Task" />

                <div>
                    <h2>{task.name}</h2>
                    <p>{task.description}</p>
                    <p><b>Due Date: </b>{datetime}</p>
                    <CategoryCard {...category} />
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