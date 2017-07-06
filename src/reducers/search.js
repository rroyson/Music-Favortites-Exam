import {
  SET_SEARCH_TEXT,
  SET_SEARCH_RESULTS,
  CLEAR_FAVORITE
} from '../constants'
import { merge } from 'ramda'

export default (state = { results: [], text: '' }, action) => {
  switch (action.type) {
    case SET_SEARCH_TEXT:
      return merge(state, { text: action.payload })
    case SET_SEARCH_RESULTS:
      return merge(state, { results: action.payload })
    case CLEAR_FAVORITE:
      return { results: [], text: '' }
    default:
      return state
  }
}
