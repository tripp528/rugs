import * as utils from 'utils'



export const update_accounts = async (dispatch, ethereum, request_connect=false) => {
  dispatch({type: 'set_wallet_address_loading', value: true})
  let accounts
  try {
    if (request_connect) {
      accounts = await ethereum.request({ method: "eth_requestAccounts"})
    } else {
      accounts = await ethereum.request({ method: "eth_accounts"})
    }
  } catch (e) {
    console.error('helpers.update_accounts error:', e)
    accounts = []
  } finally {
    dispatch({type: 'set_wallet_address', value: accounts})
    dispatch({type: 'set_wallet_address_loading', value: false})
  }
}


export const update_chain_id = async (dispatch, ethereum) => {
  dispatch({type: 'set_chain_id_loading', value: true})
  let chain_id
  try {
    chain_id = await ethereum.request({ method: 'eth_chainId' });
  } catch (e) {
    console.error('helpers.update_chain_id error:', e)
    chain_id = null
  } finally {
    dispatch({type: 'set_chain_id', value: chain_id})
    dispatch({type: 'set_chain_id_loading', value: false})
  }
}


export const add_eth_listeners = async (dispatch, ethereum) => {
  ethereum.on('connect', async info => {
    // console.log('ethereum connect event')
  })
  ethereum.on('disconnect', error => {
    console.error('ethereum disconnect event: ', error)
    // TODO: delete wallet data etc
  })
  ethereum.on('accountsChanged', accounts => {
    dispatch({type: 'set_wallet_address', value: accounts})
  })
  ethereum.on('chainChanged', chainId => {
    dispatch({type: 'set_chain_id', value: chainId})
  })
  ethereum.on('message', message => {
    console.log('ethereum message event: ', message)
  })
}
