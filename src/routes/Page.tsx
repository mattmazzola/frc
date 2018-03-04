import * as React from 'react'
import {
    NavLink,
    Switch,
    Route
} from 'react-router-dom'
import Settings from './Settings'
import Runner from './Runner'
import NoMatch from './NoMatch'
import './Page.css'

export default function () {
    return <div className="frc-page">
        <header className="frc-page_header">
            <NavLink to="/"><h1>FRC</h1></NavLink>
        </header>
        <main className="frc-page_main">
            <Switch>
                <Route path="/settings" exact={true} component={Settings} />
                <Route path="/runner" exact={true} component={Runner} />
                <Route component={NoMatch} />
            </Switch>
        </main>
    </div>
}