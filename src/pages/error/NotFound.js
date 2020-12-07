import React from 'react'
import { Link } from 'react-router-dom'

import PageMeta from '../../utils/PageMeta'

const NotFound = () => {
    return (
        <React.Fragment>
            <PageMeta title="404 Error | Tasky" description="Manage Your Task Easily"></PageMeta>
            <div className="content">
                <div className="flex-center text-center">
                    <div>
                        <h1>Oops, you're stranded!</h1>
                        <p>Let me return you to a safe place <Link class="hyperlink" to="/">here</Link>...</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default NotFound