import { combineReducers } from 'redux'
import * as recipesReducer from './recipes'
import * as favoritesReducer from './favorites'
import * as appNavReducer from './appnav'
import * as recipeNavReducer from './recipenav'

export default combineReducers(Object.assign({},
	recipesReducer,
	favoritesReducer,
	appNavReducer,
	recipeNavReducer,
))
