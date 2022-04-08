import * as helpers from 'model/helpers'
import * as utils from 'utils'


export const sleep = ({ dispatch, getState }) => async (action) => {
  dispatch({ type: 'start_sleep' })
  await new Promise(r => setTimeout(r, action.ms))
  dispatch({ type: 'end_sleep' })
}


export const connect_eth = ({ dispatch, getState }) => async (action) => {
  // adds ethereum to db

  // skip if already connected
  if (getState().ethereum) {
    // console.log('connect_eth: already connected');
    return
  }

  // check if metamask is installed
  const { ethereum } = window
  if (!ethereum) {
    alert("Make sure you have metamask")
    console.log("Make sure you have metamask")
    return
  }

  // successfully connected
  dispatch({type: 'set_ethereum', value: ethereum})
}


export const update_chain_id = ({ dispatch, getState }) => async (action) => {
  const { ethereum } = getState()
  if (!ethereum) {
    console.error('async_handlers.update_chain_id: ethereum not connected')
    return
  }
  await helpers.update_chain_id(dispatch, ethereum)
}


export const update_accounts = ({ dispatch, getState }) => async (action) => {
  const { ethereum } = getState()
  if (!ethereum) {
    console.error('async_handlers.update_accounts: ethereum not connected')
    return
  }
  await helpers.update_accounts(dispatch, ethereum, false)
}


export const connect_wallet = ({ dispatch, getState }) => async (action) => {
  // connect to wallet
  const { ethereum } = getState()
  if (!ethereum) {
    console.error('async_handlers.connect_wallet: ethereum not connected')
    return
  }
  await helpers.update_accounts(dispatch, ethereum, true)
}
