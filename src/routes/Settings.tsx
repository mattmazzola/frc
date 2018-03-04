import * as React from 'react'
import {
    NavLink
} from 'react-router-dom'

export default function () {
    return <div className="frc-page">
        <NavLink className="frc-page_header" to="/">Settings</NavLink>
        <main className="frc-page_main">
            Settings
        </main>
    </div>
}