
import React, { useState, useEffect } from 'react'
import { matchPath } from 'react-router'
import { Route, Switch, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Helmet } from 'react-helmet'

// Import Pages
import TaskList from '../src/pages/TaskList'
import TaskAdd from '../src/pages/TaskAdd'
import TaskView from '../src/pages/TaskView'
import TaskEdit from '../src/pages/TaskEdit'

import CategoryList from '../src/pages/CategoryList'
import CategoryAdd from '../src/pages/CategoryAdd'
import CategoryEdit from '../src/pages/CategoryEdit'

import NotFound from '../src/pages/error/NotFound'

// Import components
import NavigationTop from '../src/components/NavigationTop'

const routes = [
    { path: '/', title: 'Manage Tasks', Component: TaskList },
    { path: '/add-task', title: 'Add Task', Component: TaskAdd },
    { path: '/view-task/:id', title: 'View Task', Component: TaskView },
    { path: '/edit-task/:id', title: 'Edit Task', Component: TaskEdit },

    { path: '/category', title: 'Manage Category', Component: CategoryList },
    { path: '/add-category', title: 'Add Category', Component: CategoryAdd },
    { path: '/edit-category/:id', title: 'Edit Category', Component: CategoryEdit },

    { path: '*', title: 'Manage Tasks', Component: NotFound }
]


const App = () => {
    const location = useLocation()
    const [title, setTitle] = useState( 'Tasky' )

    useEffect( () => {
        const route = routes.find( route => {
            let result = matchPath( location.pathname, {
                path: route.path,
                exact: true,
                strict: true
            } )

            console.log( result)
            return result && result.isExact
        } )

        route && setTitle( route.title )
    }, [location.pathname] )

    const pages = routes.map( ( { path, Component } ) => (
        <Route key={path} path={path} exact>
            <Component />
        </Route>
    ) )

    console.log(pages)

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            <div className="app-container">
                <NavigationTop title={title} />
                <div className="page">
                    <TransitionGroup>
                        <CSSTransition
                            key={location.key}
                            timeout={500}
                            classNames="content"
                        >
                            <div className="content">
                                <Switch location={location}>
                                    {pages}
                                </Switch>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
            </div>
        </>
    )
}

export default App
