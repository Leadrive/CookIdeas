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
import Icon from 'react-native-vector-icons/EvilIcons'
import { ActionCreators } from '../actions'

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
				<Icon name='star' size={36} color={tintColor} />
			)
		}
	}
	render(){
		const favorites=this.props.favorites
		return (
			<View style={styles.scene}>
				<ListView
					style={styles.scrollSection}
					enableEmptySections={true}
					dataSource={this.props.favorites}
					renderRow={(row)=>{
						return (
						<TouchableHighlight key={row.href} onPress={()=>{
							this.props.navigation.navigate('Recipe',{recipe:row})
						}}>
							<View style={styles.result}>
								<Image source={{uri:row.thumbnail}} style={styles.resultImage}/>
								<View style={styles.resultInfo}>
									<Text
										style={styles.resultInfoTitle}
										ellipsizeMode='tail'
										numberOfLines={1}
									>{row.title.trim()}</Text>
									<Text
										style={styles.resultInfoDesc}
										ellipsizeMode='tail'
										numberOfLines={1}
									>{row.ingredients.trim()}</Text>
								</View>
								<View style={styles.resultFavorite}>
								<TouchableWithoutFeedback onPress={()=>this.props.toggleFavorite(row)}>
									<Icon name='star' size={24} color='orange' />
								</TouchableWithoutFeedback>
								</View>
							</View>
						</TouchableHighlight>)
					}}
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
	result:{
		flex:1,
		flexDirection:'row',
		borderTopColor:'#ccc',
		borderTopWidth:1,
	},
	resultImage:{
		width:120,
		height:80,
	},
	resultFavorite:{
		width:30,
		height:80,
		justifyContent:'center',
		alignItems:'center'
	},
	resultInfo:{
		flex:1,
		flexShrink:1,
		flexDirection:'column',
		justifyContent: 'space-between',
		padding:5
	},
	resultInfoTitle:{
		color:'black',
		height:20,
	},
	resultInfoDesc:{
		color:'grey',
		height:20,
	}
})

export default connect(
	state=>({
		favorites: ds.cloneWithRows(state.favorites),
	}),
	dispatch=>( bindActionCreators(ActionCreators, dispatch) )
)(Favorites)
