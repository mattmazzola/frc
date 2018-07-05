import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Root from './routes/Root'
import { unregister } from './registerServiceWorker'
import './reset.css'
import './index.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { ReduxState } from './types'
import rootReducer from './reducers'
import { throttle } from 'lodash'
import { load, save } from './services/localStorage'

const persistedState: Partial<ReduxState> = load()

const store = createStore(
  rootReducer,
  persistedState
)

store.subscribe(throttle(() => {
  const state = store.getState()
  const stateToPersist = {
    carsSettings: state.carsSettings,
    pailsRailsSettings: state.settings
  }

  save(stateToPersist)
  console.log(JSON.stringify(stateToPersist))
}, 1000))

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
unregister()
