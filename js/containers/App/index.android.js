import React, { Component } from 'react'
import { BackAndroid } from 'react-native'
import { connect } from 'react-redux'
import {
	addNavigationHelpers,
	DrawerNavigator,
	TabNavigator,
	StackNavigator
} from 'react-navigation'
import {
	Button
} from 'react-native'
import Search from '../Search'
import Recipe from '../Recipe'
import Favorites from '../Favorites'

export const AppNav= TabNavigator({
	Search: {screen: Search},
	Favorites: {screen: Favorites}
})

class NavContainer extends Component{
	componentDidMount(){
		BackAndroid.addEventListener('hardwareBackPress', ()=>{
			this.props.hardBack()
			return true
		})
	}
	render(){
		return (<AppNav navigation={addNavigationHelpers({
			dispatch: this.props.dispatch,
			state: this.props.tab
		})} />)
	}
}

const Nav=connect(({tab})=>({tab}))(NavContainer)
Nav.navigationOptions={
	title:(props)=>{return 'Cook Ideas'},
}

export const RecipeNav=StackNavigator({
	Home: {screen:Nav},
	Recipe: {screen:Recipe}
})

export default connect(({nav})=> ({nav}))(props=>(
	<RecipeNav navigation={addNavigationHelpers({
		dispatch: props.dispatch,
		state: props.nav
	})} />
))
