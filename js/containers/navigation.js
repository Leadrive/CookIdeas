import React, {Component} from 'react'
import {connect} from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'
import {
	TabNavigator,
	StackNavigator
} from 'react-navigation'
import Search from './Search'
import Recipe from './Recipe'
import About from './About'

export const Tabs = TabNavigator({
	Search: {screen: Search},
	About: {screen: About}
})

const AppTabs=connect(({tab})=>({tab}))((props)=>(
	<Tabs navigation={addNavigationHelpers({
		dispatch: props.dispatch,
		state: props.tab
	})} />
))

export const AppNav=StackNavigator({
	Home: {screen:AppTabs},
	Recipe: {screen:Recipe}
})
