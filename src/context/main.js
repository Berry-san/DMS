import { createContext, useContext, useReducer, useMemo } from 'react'
import { SessionStorageName } from './constants'

let sessionStorageState
if (typeof window !== 'undefined') {
  sessionStorageState = sessionStorage.getItem(SessionStorageName)
}

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
  // localStorage.setItem(SessionStorageName, JSON.stringify(newState))
  sessionStorage.setItem(SessionStorageName, JSON.stringify(newState))
  return newState
}

const initialState = sessionStorageState
  ? {
      ...JSON.parse(sessionStorageState),
    }
  : {
      user: {},
    }

export const globalStoreContext = createContext({
  state: initialState,
  dispatch: () => {},
})

// eslint-disable-next-line react/prop-types
export const GlobalStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch])
  return (
    <globalStoreContext.Provider value={value}>
      {children}
    </globalStoreContext.Provider>
  )
}

export const useGlobalStoreContext = () => {
  const { state, dispatch } = useContext(globalStoreContext)
  return { state, dispatch }
}
