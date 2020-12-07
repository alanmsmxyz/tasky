
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Import Pages
import TaskList from '../src/pages/TaskList'
import TaskAdd from '../src/pages/TaskAdd'
import TaskView from '../src/pages/TaskView'
import TaskEdit from '../src/pages/TaskEdit'
import NotFound from '../src/pages/error/NotFound'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route path="/add-task" component={TaskAdd} />
          <Route path="/edit-task/:id" component={TaskEdit} />
          <Route path="/view-task/:id" component={TaskView} />
          <Route path="/" exact component={TaskList} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
