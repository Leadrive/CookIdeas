import * as types from './types'
import Api from '../lib/api'

export function toggleFavorite(recipe){
	return {
		type: types.TOGGLE_FAVORITE,
		recipe
	}
}
