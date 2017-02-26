import { OPEN_ALBUM } from '../actions/albums'
import { ADD_FILE } from '../actions/albumDetail'

export default (activeAlbumState = {}, action, state) => {
  console.log('albumView', state)

  switch (action.type) {
    case OPEN_ALBUM:
      return action.album
    case ADD_FILE:
      const { albums } = state
      const album = albums.find(item => item.id === action.albumId)
      album.files = {
        ...album.files,
        [action.fileId]: true,
      }
      return { ...activeAlbumState }
    default:
      return activeAlbumState
  }
}
