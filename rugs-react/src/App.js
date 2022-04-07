import './App.css'
import { useEffect } from 'react'
import * as utils from 'utils'
import * as hooks from 'model/hooks'
import { Provider } from 'model/model'

const App = () => {
  const dispatch = hooks.useDispatch()
  const [wallet_address, wallet_address_loading] = hooks.useWalletAddress()

  //run function checkIfWalletIsConnected when the page loads
  useEffect(() => {
    const { ethereum } = window
    ethereum.on('connect', info => {console.log(info)})
    ethereum.on('disconnect', error => {console.log(error)})
    ethereum.on('accountsChanged', accounts => {console.log(accounts)})
    ethereum.on('chainChanged', chainId => {console.log(chainId)})
    
    // TODO: get registration of these into async handler, define functions elsewhere,
    // and removeListener when unmounting


    dispatch({type: 'check_if_wallet_is_connected'})

  }, [])

  //connect to wallet
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
