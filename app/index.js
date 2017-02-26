import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import 'react-virtualized/styles.css'

import routes from './routes'
import configureStore from './store/configureStore'
import memoryHistory from './memoryHistory'
import { loadStateSync, saveStateSync, defaultState } from './services/state'
import { initialState } from './actions/app'
import './app.global.css'

const state = loadStateSync() || defaultState
const store = configureStore(state)

store.subscribe(() => {
  const { albums, files } = store.getState()
  const newState = { ...state, albums, files }
  saveStateSync(newState)
})

store.dispatch(initialState(state))

const history = syncHistoryWithStore(memoryHistory, store)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root'),
)
