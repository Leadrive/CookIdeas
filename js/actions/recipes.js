import * as types from './types'
import Api from '../lib/api'

export function fetchRecipes(ingredients,page=1){
	return (dispatch, getState)=>{
		dispatch(setSearch({ingredients,page}))

		const params=[
			`i=${encodeURI(ingredients)}`,
			`p=${page}`
		].join('&')
console.log('$$$$$',params)
		return Api.get(`/api?${params}`).then(results =>{
			dispatch(setSearchedRecipes({recipes:results}))
		}).catch((ex)=>{
			console.error(ex)
		})
	}
}
export function setSearch(search){
	return {
		type: types.SET_SEARCH,
		search
	}
}
export function setSearchedRecipes({recipes}){
	return {
		type: types.SET_SEARCHED_RECIPES,
		recipes
	}
}
export function clearRecipes(){
	return {
		type: types.CLEAR_RECIPES
	}
}
