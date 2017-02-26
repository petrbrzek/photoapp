// @flow
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import AlbumsPage from './containers/AlbumsPage'
import AlbumDetail from './containers/AlbumDetail'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={AlbumsPage} />
    <Route path="/album-detail/:id" component={AlbumDetail} />
  </Route>
)
