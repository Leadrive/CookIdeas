import React, { Component } from 'react'
import ReactNative, {
	Text,
	Button,
	WebView
} from 'react-native'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/EvilIcons'
import { ActionCreators } from '../actions'

function toggle(recipe){
	this.props.toggleFavorite(recipe)
}

class Recipe extends Component{
	static navigationOptions={
		title:({state})=>state.params.recipe.title.trim(),
		header:({state,setParams})=>{
			if (!state.params) return
			const params=state.params
			const toggle=params.toggle||function(){}
			if (params.saved){
				return {right:<Button title='unsave' onPress={()=>{setParams({saved:0});toggle(params.recipe)}} />}
			}
			return {right:<Button title='save' onPress={()=>{setParams({saved:1});toggle(params.recipe)}} />}
		}
	}
	// HACK for https://github.com/react-community/react-navigation/issues/145
	componentWillMount(){
		const props=this.props
		const params=props.navigation.state.params
		const recipe=params.recipe
		const idx=props.favorites.findIndex(row=>row.href===recipe.href)
		props.navigation.setParams({saved:idx>-1,toggle:toggle.bind(this)})
	}
	render(){
		const props=this.props
		const nav = props.navigation
		if (!nav.state.params) return <Text>Error:{JSON.stringify(nav.state)}</Text>
		const {params}=nav.state
		return (
			<WebView
				source={{uri:params.recipe.href}}
			/>
		)
	}
}

export default connect(
	state=>({
		favorites:state.favorites
	}),
	dispatch=>( bindActionCreators(ActionCreators, dispatch) )
)(Recipe)
