import {NavigationActions} from 'react-navigation'
import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import {RecipeNav} from '../containers/App'

export const nav= createReducer({
	index:0,
	routes:[
		{key:'home', routeName:'Home'},
	]
},{
	[types.HARD_BACK](state,action){
		AppNav.router.getStateForAction(NavigationActions.back(),state)
	},
},(state,action)=>(
	RecipeNav.router.getStateForAction(action, state)
))
