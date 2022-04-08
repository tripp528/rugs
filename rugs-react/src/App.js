import './App.css'
import { useEffect, useState } from 'react'
import * as utils from 'utils'
import * as hooks from 'model/hooks'
import * as helpers from 'model/helpers'
import { Provider } from 'model/model'

const App = () => {
  const dispatch = hooks.useDispatch()
  const [wallet_address, wallet_address_loading] = hooks.useWalletAddress()
  const ethereum = hooks.useEthereum()

  // connect to metamask
  useEffect(() => {
    dispatch({type: 'connect_eth'})
  }, [dispatch])


  // add listeners for account / connection / chain events
  useEffect(() => {
    if (ethereum) {
      helpers.add_eth_listeners(dispatch, ethereum)
    }

    return () => {
      if (ethereum) {
        ethereum.removeAllListeners()
      }
    }

  }, [dispatch, ethereum])


  // update the chain ID on connection
  useEffect(() => {
    if (ethereum) {
      dispatch({type: 'update_chain_id'})
    }
    return (() => {
      dispatch({type: 'set_chain_id', value: null})
    })
  }, [dispatch, ethereum])


  // update wallet / account on connection
  useEffect(() => {
    if (ethereum) {
      dispatch({type: 'update_accounts'})
    }
    return (() => {
      dispatch({type: 'set_wallet_address', value: null})
    })
  }, [dispatch, ethereum])


  // connect to wallet
  const connect_button = () => (
    <button
      onClick={() => dispatch({type: 'connect_wallet'})}
      disabled={wallet_address_loading}
    >
      Connect to Wallet
    </button>
  )

  //wallet connected
  const connected_message = () => (
    <div>
      <p>Connected to the wallet {wallet_address}</p>
    </div>
  )

  return (
    <div className="App">
      <div style={{display: 'flex', justifyContent:'center', height: '50px'}}>
        {utils.is_nullish(wallet_address) ? connect_button()  : connected_message()}
        <br />
      </div>
    </div>
  )
}

const AppWrapped = () => {
  return (
    <Provider>
      <App />
    </Provider>
  )
}

export default AppWrapped
