/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import { AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import {
	createStore,
	applyMiddleware,
	compose
} from 'redux'
import {
	persistStore,
	autoRehydrate
} from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from '../reducers'

const loggerMiddleware = createLogger({predicate: (getState,action)=> __DEV__})

function configureStore(serverRendered){
	return createStore(reducer, serverRendered, compose(
			applyMiddleware(
				thunkMiddleware,
				loggerMiddleware,
			),
			autoRehydrate()
		)
	)
}


import { AppRegistry } from 'react-native'
import App from './App'

class CookIdeas extends React.Component{
	store = configureStore({})
	componentDidMount(){
		persistStore(this.store, {storage:AsyncStorage})//.purge() // to clear
	}
	render(){
		return <Provider store={this.store}><App/></Provider>
	}
}

AppRegistry.registerComponent('CookIdeas', () => CookIdeas)
