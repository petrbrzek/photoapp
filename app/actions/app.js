// @flow

export const APP_LAUNCHED = 'APP_LAUNCHED';

export function initialState(state: Object) {
  return {
    type: APP_LAUNCHED,
    state,
  };
}
