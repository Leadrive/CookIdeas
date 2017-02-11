import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const searchedRecipes= createReducer([],{
	[types.SET_SEARCHED_RECIPES](state,action){
		return state.concat(action.recipes)
	},
	[types.CLEAR_RECIPES](state,action){
		return []
	}
})
export const search = createReducer({ingredients:null,page:1,ended:false},{
	[types.SET_SEARCH](state,action){
		return Object.assign(action.search)
	},
	[types.SET_SEARCHED_RECIPES](state,action){
		return Object.assign(state,{ended:!action.recipes.length})
	},
})
