import { localStorageName } from './constants'

const reducer = (state, action) => {
  let newState = { ...state }
  switch (action.type) {
    case 'SET_USER': {
      newState = {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      }
      break
    }
    default:
      throw new Error(`No such type ${action.type}`)
  }
  localStorage.setItem(localStorageName, JSON.stringify(newState))
  return newState
}

export default reducer
