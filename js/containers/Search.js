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
import Icon from 'react-native-vector-icons/FontAwesome'
import { ActionCreators } from '../actions'
import RecipeRow from './RecipeRow'

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
				<Icon name='search' size={24} color={tintColor} />
			)
		}
	}
	state={
		searching:false,
		ingredientsLocked:false,
	}
	onBtnPressed(){
		if (this.state.ingredientsLocked){
			return this._textInput.clear()
		}
		this.setState({searching:true})
		this.props.clearRecipes()
		this.props.fetchRecipes(this.props.search.ingredients,1).then(()=>{
			this.setState({searching:false,ingredientsLocked:true})
		})
		Keyboard.dismiss()
	}
	onTextChanged(input){
		this.props.setSearch({ingredients:input,page:1,ended:false})
		this.setState({ingredientsLocked:false})
	}
	render(){
		const favorites=this.props.favorites
		const count=this.state.searching ? 
			<Text style={styles.searchCount}>Searching...</Text> :
			(this.props.searchedRecipes.getRowCount()) ? 
			<Text style={styles.searchCount}>Return {this.props.searchedRecipes.getRowCount()}++ recipes</Text> :
			<Text style={styles.searchCount}>No recipes</Text>
		const btn=this.state.ingredientsLocked ? 
			<Icon name='close' size={24} color='#007aff' /> : 
			<Icon name='search' size={24} color='#007aff' />
		return (
			<View style={styles.scene}>
				<View style={styles.searchSection}>
					<TextInput
						style={styles.searchInput}
						autoFocus={true}
						editable={true}
						returnKeyType='search'
						placeholder='Ingredients (comma delimited)'
						value={this.props.search.ingredients}
						ref={c=>this._textInput=c}
						onChangeText={(input)=>this.onTextChanged(input)}
						onSubmitEditing={()=>this.onBtnPressed()}
					/>
					<View style={styles.searchButton}>
					<TouchableHighlight onPress={()=>this.onBtnPressed()}>
						{btn}
					</TouchableHighlight>
					</View>
				</View>
				<View style={styles.searchStatus}>{count}</View>
				<ListView
					ref={list=>this._listView=list}
					style={styles.scrollSection}
					enableEmptySections={true}
					dataSource={this.props.searchedRecipes}
					onEndReachedThreshold={0}
					onEndReached={()=>{
						const search=this.props.search
						if (search.ended) return
						this.props.fetchRecipes(search.ingredients,search.page+1)
					}}
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
	searchSection:{
		flexDirection:'row',
		borderBottomColor:'#ccc',
		borderBottomWidth:1,
		padding:5,
		height:48
	},
	searchInput:{
		flex:1,
		flexShrink:1
	},
	searchButton:{
		width:64,
		justifyContent: 'center',
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
})

export default connect(
	state=>({
		searchedRecipes: ds.cloneWithRows(state.searchedRecipes),
		favorites: state.favorites,
		search: state.search
	}),
	dispatch=>( bindActionCreators(ActionCreators, dispatch) )
)(Search)
