import React, { Component } from 'react'
import ReactNative, {
	ListView,
	View,
	Text,
	Image,
	TouchableHighlight,
	TouchableWithoutFeedback,
	StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ActionCreators } from '../actions'
import RecipeRow from './RecipeRow'

const ds = new ListView.DataSource({
	rowHasChanged:(r1,r2)=>r1!==r2
})

class Favorites extends Component{
	static navigationOptions={
		drawer:()=>({
			label:'Favorites'	
		}),
		tabBar:{
			label:'Favorites',
			icon:({tintColor})=>(
				<Icon name='star-o' size={24} color={tintColor} />
			)
		}
	}
	render(){
		return (
			<View style={styles.scene}>
				<ListView
					style={styles.scrollSection}
					enableEmptySections={true}
					dataSource={this.props.list}
					renderRow={(row)=>(
						<RecipeRow recipe={row} {...this.props} />
					)}
				/>
			</View>
		)
	}
}

const styles= StyleSheet.create({
	scene:{
		flex:1,
	},
	scrollSection:{
		padding:10,
		backgroundColor:'white',
	},
})

export default connect(
	state=>({
		list: ds.cloneWithRows(state.favorites),
	}),
	dispatch=>( bindActionCreators(ActionCreators, dispatch) )
)(Favorites)
