// @flow
import { routerReducer as routing } from 'react-router-redux'
import albums from './albums'
import albumDetail from './albumDetail'
import albumCoverPhotos from './albumCoverPhotos'
import files from './files'

function rootReducer(state, action) {
  return {
    routing: routing(state.routing, action),
    albums: albums(state.albums, action, state),
    activeAlbum: albumDetail(state.activeAlbum, action, state),
    albumCoverPhotos: albumCoverPhotos(state.albumCoverPhotos, action, state),
    files: files(state.files, action, state),
  }
}

export default rootReducer
