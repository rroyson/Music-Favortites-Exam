import React from 'react'
import MusicCard from '../components/music-card'
import Header from '../containers/header'
import BigButton from '../components/big-button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { find, propEq } from 'ramda'
import { SET_FAVORITE, DELETE_FAVORITE } from '../constants'
import { Button } from 'jrs-react-components'

class Show extends React.Component {
  componentDidMount() {
    const favorite = find(
      propEq('id', this.props.match.params.id),
      this.props.favorites
    )
    this.props.dispatch({ type: SET_FAVORITE, payload: favorite })
  }

  render() {
    const props = this.props
    console.log('props', props)
    return (
      <div>
        <Header />
        <main>
          <div className="mw6 center mt2 tc">
            <MusicCard
              image={props.favorite.poster}
              title={props.favorite.title}
            />
          </div>
          <div className="mw6 tc center">
            <a
              className="link ba br2 w4 pa2 center db mb3"
              href={props.favorite.href}
              target="_blank"
            >
              Play Album
            </a>
            <Link to="/"><BigButton>Return</BigButton></Link>
            <div className="cf">
              <BigButton>
                Delete
              </BigButton>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

// const deleteFavorite = history => (dispatch, getState) => {
//   const favorites = getState().favorites
//   const result = prompt('want to delete?')
//   if (result) {
//     fetch(process.env.REACT_APP_API + '/favorites', {
//       method: 'DELETE',
//       headers: new Headers({
//         'Content-Type': 'application/json'
//       }),
//       body: JSON.stringify(favorites)
//     })
//     dispatch({ type: DELETE_FAVORITE, payload: favorites.id })
//     history.push('/')
//   }
// }
//
// const mapActionsToProps = dispatch => {
//   return {
//     handleClick: history => e => {
//       e.preventDefault()
//       dispatch(deleteFavorite(history))
//     }
//   }
// }

function mapStateToProps(state) {
  return {
    favorites: state.favorites,
    favorite: state.favorite
  }
}

const connector = connect(mapStateToProps)

export default connector(Show)
