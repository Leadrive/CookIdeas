import React, { Component } from 'react'
import { BackAndroid } from 'react-native'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'
import {
	DrawerNavigator,
	StackNavigator
} from 'react-navigation'
import Search from '../Search'
import Recipe from '../Recipe'
import About from '../About'

export const AppNav= DrawerNavigator({
	Search: {screen: Search},
	About: {screen: About}
},{
	drawerPosition:'right',
	contentOptions:{
		activeTintColor:'#000'
	}
})

class NavContainer extends Component{
	componentDidMount(){
		BackAndroid.addEventListener('hardwareBackPress', ()=>{
			this.props.hardBack()
			return true
		})
	}
}

const Nav=connect(({tab})=>({tab}))((props)=>(
	<AppNav navigation={addNavigationHelpers({
		dispatch: props.dispatch,
		state: props.tab
	})} />
))

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
