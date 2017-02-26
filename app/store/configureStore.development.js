import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const logger = createLogger({
  level: 'info',
  collapsed: true,
})

const router = routerMiddleware(hashHistory)
/* eslint-enable no-underscore-dangle */
const enhancer = compose(applyMiddleware(thunk, router, logger))

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept(
      '../reducers',
      () => store.replaceReducer(require('../reducers')), // eslint-disable-line global-require
    )
  }

  return store
}
