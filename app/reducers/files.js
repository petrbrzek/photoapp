import { ADD_FILE } from '../actions/albumDetail'

export default (state = {}, action) => {
  const {
    type,
    name,
    fileId,
  } = action

  switch (type) {
    case ADD_FILE:
      return {
        ...state,
        [fileId]: { id: fileId, name },
      }
    default:
      return state
  }
}
