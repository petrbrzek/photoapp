import sample from 'lodash/sample'
import { APP_LAUNCHED } from '../actions/app'

export default (coverPhotos, action) => {
  switch (action.type) {
    case APP_LAUNCHED:
      const { albums } = action.state
      coverPhotos = albums.reduce(
        (result, album) => ({
          ...result,
          [album.id]: sample(Object.keys(album.files)),
        }),
        {},
      )
      return coverPhotos
    default:
      return coverPhotos
  }
}
