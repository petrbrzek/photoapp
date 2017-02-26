// @flow

import { remote } from 'electron'
import fs from 'fs-extra'
import path from 'path'

import config from '../config'

const getFileDirectoryPath = () =>
  path.resolve(
    remote.app.getPath('home'),
    config.HOME_DIRECTORY_NAME,
    config.FILES_DIRECTORY_NAME,
  )

const saveFileSync = ({ filePath, id }: { filePath: string, id: string }) => {
  try {
    fs.copySync(filePath, path.resolve(getFileDirectoryPath(), id))
  } catch (error) {
    console.error(`Error: saveFileSync, ${error} `)
  }
}

export { saveFileSync, getFileDirectoryPath }
