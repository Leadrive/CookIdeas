import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const favorites= createReducer([],{
	[types.TOGGLE_FAVORITE](state,{recipe}){
		const {href}=recipe 
		const idx=state.findIndex(row=>{
			return row.href===href
		})
		if (-1===idx) return state.concat(recipe)
		return [...state.slice(0,idx),...state.slice(idx+1)]
	}
})
