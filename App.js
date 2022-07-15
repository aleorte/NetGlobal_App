import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, {persistor} from './src/state/store'
import Index from "./src/components/Index"

const App = () => {
  return (
        <Provider store = {store}>
            <PersistGate persistor={persistor} loading={null}>
            <Index />
            </PersistGate>
        </Provider>
    )
}

export default App