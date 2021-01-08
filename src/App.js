
import React, { useState, useLayoutEffect } from 'react'
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
    { path: '/', title: 'Manage Tasks', Component: TaskList, prevPage: null },
    { path: '/add-task', title: 'Add Task', Component: TaskAdd, prevPage: '/' },
    { path: '/view-task/:id', title: 'View Task', Component: TaskView, prevPage: '/' },
    { path: '/edit-task/:id', title: 'Edit Task', Component: TaskEdit, prevPage: '/view-task' },

    { path: '/category', title: 'Manage Category', Component: CategoryList, prevPage: '/' },
    { path: '/add-category', title: 'Add Category', Component: CategoryAdd, prevPage: '/category' },
    { path: '/edit-category/:id', title: 'Edit Category', Component: CategoryEdit, prevPage: '/category' },

    { path: '*', title: 'Error', Component: NotFound, prevPage: null }
]

const App = () => {
    const location = useLocation()
    const entryRoute = routes.find( route => {
        let result = matchPath( location.pathname, {
            path: route.path,
            exact: true,
            strict: true
        } )

        return result && result.isExact
    } )
    const [route, setRoute] = useState(entryRoute)

    useLayoutEffect( () => {
        const route = routes.find( route => {
            let result = matchPath( location.pathname, {
                path: route.path,
                exact: true,
                strict: true
            } )

            return result && result.isExact
        } )

        setRoute( route )
    }, [location.pathname] )

    const pages = routes.map( ( { path, Component } ) => (
        <Route key={path} path={path} exact>
            <Component />
        </Route>
    ) )

    return (
        <>
            <Helmet>
                <title>{route.title}</title>
            </Helmet>

            <div className="app-container">
                <NavigationTop title={route.title} prevPage={route.prevPage} />
                <div className="page">
                    <TransitionGroup>
                        <CSSTransition
                            key={location.key}
                            timeout={300}
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
