import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Root from './routes/Root'
import { unregister } from './registerServiceWorker'
import './reset.css'
import './index.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

export const createReduxStore = () => createStore(
  rootReducer
)

ReactDOM.render(
  <Provider store={createReduxStore()}>
    <Root />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
unregister()
