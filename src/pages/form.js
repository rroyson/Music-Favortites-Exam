import React from 'react'
import Header from '../containers/header'
import { Link } from 'react-router-dom'
import { TextField, Button } from 'jrs-react-components'
import BigButton from '../components/big-button'
import { connect } from 'react-redux'
import {
  SET_FAVORITE_TITLE,
  SET_FAVORITE_BAND,
  SET_FAVORITE_POSTER,
  SET_FAVORITE_RANK,
  APPEND_FAVORITE,
  CLEAR_SEARCH
} from '../constants'

const Form = props =>
  <div>
    <Header />
    <main>
      <div className="mw6 pv2 ph3 center mt2">
        <h2>Add New Favorite</h2>
        <div className="cf">
          <div className="fr">
            <Link to="/search">
              <Button>Search</Button>
            </Link>
          </div>
        </div>
        <form onSubmit={props.handleSubmit(props.history)}>
          <TextField
            value={props.favorite.name}
            onChange={props.setName}
            label="Name"
            optional={false}
            help="Enter Album Name"
          />
          <TextField
            value={props.favorite.href}
            onChange={props.setHref}
            label="Link"
            optional={false}
            help="Link to page for easy access"
          />
          <TextField
            value={props.favorite.poster}
            onChange={props.setPoster}
            label="Poster"
            optional={false}
            help="Enter Album Poster Link"
          />
          <TextField
            value={props.favorite.rank}
            onChange={props.setRank}
            label="Rank"
            optional={false}
            help="Enter Rank"
            width={20}
          />
          <div className="mt4 center tc">
            <BigButton>Create Favorite</BigButton>
          </div>
        </form>
      </div>
    </main>
  </div>

const setFavorite = history => (dispatch, getState) => {
  const favorite = getState().favorite
  fetch(process.env.REACT_APP_API + '/favorites', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(favorite)
  })
  dispatch({ type: APPEND_FAVORITE, payload: favorite })
  dispatch({ type: CLEAR_SEARCH })
  history.push('/')
}

const mapActionsToProps = dispatch => {
  return {
    handleSubmit: history => e => {
      e.preventDefault()
      dispatch(setFavorite(history))
    },
    setName: e =>
      dispatch({ type: SET_FAVORITE_TITLE, payload: e.target.value }),
    setHref: e =>
      dispatch({ type: SET_FAVORITE_BAND, payload: e.target.value }),
    setPoster: e =>
      dispatch({ type: SET_FAVORITE_POSTER, payload: e.target.value }),
    setRank: e => dispatch({ type: SET_FAVORITE_RANK, payload: e.target.value })
  }
}

function mapStateToProps(state) {
  return { favorite: state.favorite }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(Form)
