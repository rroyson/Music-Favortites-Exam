import React from 'react'
import Header from '../containers/header'
import { Link } from 'react-router-dom'
import { TextField, Button, ImageListItem } from 'jrs-react-components'
import { connect } from 'react-redux'
import {
  SET_SEARCH_TEXT,
  SET_SEARCH_RESULTS,
  SET_FAVORITE,
  CLEAR_FAVORITE
} from '../constants'
import { map } from 'ramda'

const Search = props => {
  function li(result) {
    return (
      <ImageListItem
        key={result.id}
        id={result.id}
        title={result.name}
        image={result.poster}
        link={
          <Button onClick={props.selectAlbum(props.history, result)}>
            Select
          </Button>
        }
      />
    )
  }
  return (
    <div>
      <Header />
      <main>
        <div className="mw6 center mt2 tc" />
        <h2 className="tc">Search Songs</h2>
        <form className="pa2 tl" onSubmit={props.handleSubmit}>
          <TextField value={props.searchText} onChange={props.handleChange} />
          <Button>Search</Button>
        </form>
        {map(li, props.searchResults)}
      </main>
    </div>
  )
}

function setMusic(dispatch, getState) {
  const searchText = getState().search.text
  fetch(process.env.REACT_APP_MUSIC + '?q=' + searchText, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_MUSIC_TOKEN}`
    }
  })
    .then(res => res.json())
    .then(items => {
      return items
    })
    .then(items => dispatch({ type: SET_SEARCH_RESULTS, payload: items }))
}

function mapActionsToProps(dispatch) {
  return {
    selectAlbum: (history, album) => e => {
      const favorite = {
        id: album.id,
        name: album.name,
        poster: album.poster,
        href: album.href
      }

      dispatch({ type: SET_FAVORITE, payload: favorite })
      dispatch({ type: CLEAR_FAVORITE })
      history.push('/new')
    },
    handleSubmit: e => {
      e.preventDefault()
      dispatch(setMusic)
    },
    handleChange: e =>
      dispatch({ type: SET_SEARCH_TEXT, payload: e.target.value })
  }
}

function mapStateToProps(state) {
  return {
    searchText: state.search.text,
    searchResults: state.search.results
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(Search)
