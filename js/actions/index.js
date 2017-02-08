import * as RecipesActions from './recipes'
import * as NavigationActions from './navigation'
import * as FavoritesActions from './favorites'

export const ActionCreators = Object.assign({},RecipesActions,NavigationActions,FavoritesActions)
