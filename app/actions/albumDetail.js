// @flow
import shortid from 'shortid'

import { saveFileSync } from '../services/fileManager'

export const ADD_FILE = 'ADD_FILE'

export function addFile(
  {
    name,
    filePath,
    albumId,
  }: { name: string, filePath: string, albumId: string },
) {
  const fileId = shortid.generate()
  saveFileSync({ filePath, id: fileId })

  return {
    type: ADD_FILE,
    name,
    fileId,
    albumId,
  }
}
