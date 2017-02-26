// @flow

import shortid from 'shortid'
import memoryHistory from '../memoryHistory'

export const CREATE_ALBUM = 'CREATE_ALBUM'
export const REMOVE_ALBUM = 'REMOVE_ALBUM'
export const RENAME_ALBUM = 'RENAME_ALBUM'
export const OPEN_ALBUM = 'OPEN_ALBUM'

export function createAlbum({ name, color }: { name: string, color: string }) {
  return {
    type: CREATE_ALBUM,
    id: shortid.generate(),
    name,
    color,
  }
}

export function removeAlbum(id: string) {
  return {
    type: REMOVE_ALBUM,
    id,
  }
}

export function renameAlbum({ newName, id }: { newName: string, id: string }) {
  return {
    type: RENAME_ALBUM,
    newName,
    id,
  }
}

export function openAlbum({ id }: { id: string }) {
  return (dispatch: () => void, getState) => {
    const { albums } = getState()
    const album = albums.find(item => item.id === id)

    dispatch({
      type: OPEN_ALBUM,
      album,
    })

    memoryHistory.push(`/album-detail/${id}`)
  }
}
