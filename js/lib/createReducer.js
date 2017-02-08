export default function createReducer(initialState, handlers, fallback) {
	return (state = initialState, action)=>{
		if (handlers.hasOwnProperty(action.type)) return handlers[action.type](state, action)
		if (fallback) return fallback(state,action)
		return state
	}
}
