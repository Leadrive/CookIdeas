import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
	addNavigationHelpers,
	TabNavigator,
	DrawerNavigator,
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

const Nav=connect(({tab})=>({tab}))((props)=>(
	<AppNav navigation={addNavigationHelpers({
		dispatch: props.dispatch,
		state: props.tab
	})} />
))
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
