import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import NavigationBottom from '../components/NavigationBottom'
import ActionButton from '../components/ActionButton'
import CategoryCard from '../components/CategoryCard'

import * as db from '../models/db'

const TaskView = () => {
    const { id } = useParams()
    const [task, setTask] = useState( null )
    const [category, setCategory] = useState( null )

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

            resultT.datetime = new Date( `${resultT.date} ${resultT.time}` ).toLocaleTimeString( undefined, {
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            } )

            setTask( resultT )
            setCategory( resultC )
        }

        id && loadData()
    }, [id] )

    return (
        <>
            { task && category &&
                <>
                    <div>
                        <h2>{task.name}</h2>
                        <p>{task.description}</p>
                        <p><b>Due Date: </b>{task.datetime}</p>
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
                </>
            }
        </>
    )
}

export default TaskView