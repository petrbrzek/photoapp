import { CREATE_ALBUM, REMOVE_ALBUM, RENAME_ALBUM } from '../actions/albums'

export default (state = [], action) => {
  console.log('albums', state, action)
  const {
    type,
    name,
    newName,
    color,
    id,
  } = action

  switch (type) {
    case CREATE_ALBUM:
      return [...state, { name, color, id, files: {} }]
    case REMOVE_ALBUM:
      return state.filter(item => item.id !== id)
    case RENAME_ALBUM:
      return state.map(item => {
        if (item.id === id) {
          item.name = newName
        }
        return item
      })
    default:
      return state
  }
}
