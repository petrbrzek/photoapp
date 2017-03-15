// @flow

import { remote } from 'electron'
import fs from 'fs-extra'
import path from 'path'

import config from '../config'

const defaultState = {
  version: 1,
  albums: [],
  files: {},
}

const getStatePath = () =>
  path.resolve(remote.app.getPath('home'), config.HOME_DIRECTORY_NAME)

const loadStateSync = () => {
  fs.ensureFileSync(path.resolve(getStatePath(), config.STATE_FILE_NAME))
  const state = fs.readJsonSync(
    path.resolve(getStatePath(), config.STATE_FILE_NAME),
    {
      throws: false,
    },
  )
  return state
}

const saveStateSync = (state: typeof defaultState) => {
  try {
    fs.outputJson(path.resolve(getStatePath(), config.STATE_FILE_NAME), state)
  } catch (error) {
    console.error(`Error: saveStateSync, ${error} `)
  }
}

export { loadStateSync, saveStateSync, getStatePath, defaultState }
