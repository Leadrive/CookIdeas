import React, { Component } from 'react'
import ReactNative, {
	ListView,
	View,
	Text,
	TextInput,
	Image,
	TouchableHighlight,
	TouchableWithoutFeedback,
	StyleSheet,
	Keyboard
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/EvilIcons'
import { ActionCreators } from '../actions'

const ds = new ListView.DataSource({
	rowHasChanged:(r1,r2)=>r1!==r2
})

class Search extends Component{
	static navigationOptions={
		drawer:()=>({
			label:'Search'	
		}),
		tabBar:{
			label:'Search',
			icon:({tintColor})=>(
				<Icon name='search' size={36} color={tintColor} />
			)
		}
	}
	constructor(props){
		super(props)
		this.state={searching:false,ingredientsInput:''}
	}
	searchPressed(){
		this.setState({searching:true})
		this.props.clearRecipes()
		this.props.fetchRecipes(...this.state.ingredientsInput.split(',')).then(()=>{
			this.setState({searching:false})
		})
	}
	render(){
		const favorites=this.props.favorites
		const count=this.state.searching ? 
			<Text style={styles.searchCount}>Searching...</Text> :
			(this.props.recipeCount) ? 
			<Text style={styles.searchCount}>Return {this.props.recipeCount} recipes</Text> :
			<Text style={styles.searchCount}>No recipes</Text>
		return (
			<View style={styles.scene}>
				<View style={styles.searchSection}>
					<TextInput
						style={styles.searchInput}
						returnKeyType='search'
						placeholder='Ingredients (comma delimited)'
						onChangeText={(ingredientsInput)=>this.setState({ingredientsInput})}
						onSubmitEditing={Keyboard.dismiss}
					/>
					<TouchableHighlight onPress={()=>this.searchPressed()} style={styles.searchButton}>
						<Text>Search</Text>
					</TouchableHighlight>
				</View>
				<View style={styles.searchStatus}>{count}</View>
				<ListView
					style={styles.scrollSection}
					enableEmptySections={true}
					dataSource={this.props.searchedRecipes}
					renderRow={(row)=>{
						const href=row.href
						const idx=favorites.findIndex(function(recipe){return recipe.href===href})
						const tintColor=idx>-1?'orange':'grey'
						return (
						<TouchableHighlight key={href} onPress={()=>{
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
									<Icon name='star' size={24} color={tintColor} />
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
	searchSection:{
		flexDirection:'row',
		borderBottomColor:'#ccc',
		borderBottomWidth:1,
		padding:5,
	},
	searchInput:{
		flex:0.8,
	},
	searchButton:{
		flex:0.2,
		alignItems:'center'
	},
	searchStatus:{
		padding:5,
		backgroundColor:'white',
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
		searchedRecipes: ds.cloneWithRows(state.searchedRecipes),
		favorites: state.favorites,
		recipeCount: state.recipeCount
	}),
	dispatch=>( bindActionCreators(ActionCreators, dispatch) )
)(Search)
