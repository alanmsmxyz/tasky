import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="flex-center text-center">
            <div>
                <h1>Oops, you're stranded!</h1>
                <p>Let me return you to a safe place <Link class="hyperlink" to="/">here</Link>...</p>
            </div>
        </div>
    )
}

export default NotFound