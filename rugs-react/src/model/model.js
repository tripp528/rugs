import { useReducerAsync } from 'use-reducer-async'
import { createContainer } from 'react-tracked'
import * as immer from 'immer'
import * as sync_handlers from 'model/sync_handlers'
import * as async_handlers from 'model/async_handlers'


const initialState = {}


function modelReducer(state, action) {
  // the reducer only handles sync handlers - see use-reducer-async documentation
  const handler = sync_handlers[action.type]
  // console.log(action)
  if (!handler) {
    throw new Error(`Action type "${action.type}" not defined in model/sync_handlers.js`)
    return
  }
  const nextState = immer.produce(state, draft => {
    handler(action, draft)
  })
  // for dev only
  window.db = nextState
  return nextState
}


const useValue = () => useReducerAsync(modelReducer, initialState, async_handlers)

const { Provider, useTrackedState, useUpdate } = createContainer(useValue)

export {
  Provider,
  useTrackedState as useDB,
  useUpdate as useDispatch,
}
