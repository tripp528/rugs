import './App.css'
import { useEffect, useState } from 'react'
import * as utils from 'utils'
import * as hooks from 'model/hooks'
import { Provider } from 'model/model'

const App = () => {
  const dispatch = hooks.useDispatch()
  const [wallet_address, wallet_address_loading] = hooks.useWalletAddress()

  //run function checkIfWalletIsConnected when the page loads
  useEffect(() => {
    dispatch({type: 'check_if_wallet_is_connected'})
  }, [])

  //connect to wallet
  const connect_button = () => (
    <button onClick={() => dispatch({type: 'connect_wallet'})}>
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
