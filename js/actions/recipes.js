import * as types from './types'
import Api from '../lib/api'

export function fetchRecipes(...ingredients){
	return (dispatch, getState)=>{
		const params=[
			`i=${encodeURI(ingredients.join(','))}`,
			'p=10'
		].join('&')

		return Api.get(`/api?${params}`).then(results =>{
			dispatch(setSearchedRecipes({recipes:results}))
		}).catch((ex)=>{
			console.error(ex)
		})
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
