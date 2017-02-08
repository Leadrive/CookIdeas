import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const searchedRecipes= createReducer([],{
	[types.SET_SEARCHED_RECIPES](state,action){
		return action.recipes
	},
	[types.CLEAR_RECIPES](state,action){
		return []
	}
})
export const recipeCount = createReducer(0,{
	[types.SET_SEARCHED_RECIPES](state,action){
		return action.recipes.length
	},
	[types.CLEAR_RECIPES](state,action){
		return 0
	}
})
