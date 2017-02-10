import React from 'react'
import ReactNative, {
	View,
	Text,
	Image,
	TouchableHighlight,
	TouchableWithoutFeedback,
	StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default (props)=>{
	const recipe=props.recipe
	const href=recipe.href
	let star
	if (props.favorites){
		const idx=props.favorites.findIndex(function(recipe){return recipe.href===href})
		star=idx>-1 ?
			<Icon name='star' size={24} color='orange' />:
			<Icon name='star-o' size={24} color='grey' />
	}else{
		star= <Icon name='star' size={24} color='orange' />
	}
	return (
	<TouchableHighlight key={href} underlayColor='orange' onPress={()=>{
		props.navigation.navigate('Recipe',{recipe})
	}}>
		<View style={styles.result}>
			<Image source={{uri:recipe.thumbnail}} style={styles.resultImage}/>
			<View style={styles.resultInfo}>
				<Text
					style={styles.resultInfoTitle}
					ellipsizeMode='tail'
					numberOfLines={1}
				>{recipe.title.trim()}</Text>
				<Text
					style={styles.resultInfoDesc}
					ellipsizeMode='tail'
					numberOfLines={1}
				>{recipe.ingredients.trim()}</Text>
			</View>
			<View style={styles.resultFavorite}>
			<TouchableWithoutFeedback onPress={()=>props.toggleFavorite(recipe)}>
				{star}
			</TouchableWithoutFeedback>
			</View>
		</View>
	</TouchableHighlight>)
}

const styles= StyleSheet.create({
	result:{
		flex:1,
		flexDirection:'row',
		paddingVertical:2
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
		justifyContent: 'space-around',
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
