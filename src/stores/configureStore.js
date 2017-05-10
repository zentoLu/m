import { createStore } from 'redux'
import rootReducer from '../reducers'

function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState
  )

  console.log(store.getState());
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore()
