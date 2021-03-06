import {
  SET_FAVORITE,
  SET_FAVORITE_TITLE,
  SET_FAVORITE_BAND,
  SET_FAVORITE_POSTER,
  SET_FAVORITE_RANK,
  CLEAR_SEARCH
} from '../constants'
import { merge } from 'ramda'

export default (state = {}, action) => {
  switch (action.type) {
    case SET_FAVORITE:
      return action.payload
    case SET_FAVORITE_TITLE:
      return merge(state, { name: action.payload })
    case SET_FAVORITE_BAND:
      return merge(state, { band: action.payload })
    case SET_FAVORITE_POSTER:
      return merge(state, { poster: action.payload })
    case SET_FAVORITE_RANK:
      return merge(state, { rank: action.payload })
    case CLEAR_SEARCH:
      return {}
    default:
      return state
  }
}
