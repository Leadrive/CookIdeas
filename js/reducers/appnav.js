import {NavigationActions} from 'react-navigation'
import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import {AppNav} from '../containers/App'

export const tab= createReducer({
	index:0,
	routes:[
		{key:'search', routeName:'Search'},
		{key:'favorites', routeName:'Favorites'},
	]
},{
	[types.HARD_BACK](state,action){
		AppNav.router.getStateForAction(NavigationActions.navigate({routeName:'DrawerClose'}),state)
	},
},(state,action)=>(
	AppNav.router.getStateForAction(action, state)
))
