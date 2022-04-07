import * as helpers from 'model/helpers'
import * as utils from 'utils'


export const sleep = ({ dispatch, getState }) => async (action) => {
  dispatch({ type: 'start_sleep' })
  await new Promise(r => setTimeout(r, action.ms))
  dispatch({ type: 'end_sleep' })
}


export const init_eth = ({ dispatch, getState }) => async (action) => {
  /* Function to init ethereum event handlers, and check if already connected */

  // access to window.ethereum
  const { ethereum } = window

  // check if metamask is installed
  if (!ethereum) {
    dispatch({type: 'set_web3_connected', value: false})
    alert("Make sure you have metamask")
    return
  }

  // add listeners
  // ethereum.on('connect', handler: (info) => {console.log(info)})

}


export const check_if_wallet_is_connected = ({ dispatch, getState }) => async (action) => {
  // check wallet connection (usually when the page loads)
  dispatch({type: 'set_wallet_address_loading', value: true})

  // access to window.ethereum
  const { ethereum } = window

  // check if user has metamask
  // TODO: put this in separate function
  if (!ethereum) {
    dispatch({type: 'set_wallet_address', value: null})
    dispatch({type: 'set_wallet_address_loading', value: false})
    alert("Make sure you have metamask")
    return
  }

  // get the wallet account
  const accounts = await ethereum.request({method: 'eth_accounts'})

  // get the first account
  if (accounts.length !== 0) {
    dispatch({type: 'set_wallet_address', value: accounts[0]})
    dispatch({type: 'set_wallet_address_loading', value: false})
  }
  else {
    dispatch({type: 'set_wallet_address', value: null})
    dispatch({type: 'set_wallet_address_loading', value: false})
  }
}


export const connect_wallet = ({ dispatch, getState }) => async (action) => {
  // connect to wallet
  dispatch({type: 'set_wallet_address_loading', value: true})

  try {
    const { ethereum } = window

    // there is no wallet extension
    // TODO: put this in separate function
    if (!ethereum) {
      dispatch({type: 'set_wallet_address', value: null})
      dispatch({type: 'set_wallet_address_loading', value: false})
      alert("Make sure you have metamask")
      return
    }

    const current_network = ethereum.networkVersion
    // console.log("Current network", current_network)

    // request access to account
    const accounts = await ethereum.request({ method: "eth_requestAccounts"})

    //set the account in the state
    dispatch({type: 'set_wallet_address', value: accounts[0]})

  } catch (e) {
    dispatch({type: 'set_wallet_address', value: null})
    console.error('Error in connect_wallet', e)
  } finally {
    dispatch({type: 'set_wallet_address_loading', value: false})
  }
}
