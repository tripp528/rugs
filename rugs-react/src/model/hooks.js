import * as helpers from 'model/helpers'
import { useDB, useDispatch } from 'model/model'

// App wide hooks

export { useDispatch, useDB }


export function useEthereum() {
  return useDB().ethereum
}


export function useListenersAdded() {
  return useDB().listeners_added
}


export function useWalletAddress() {
  const DB = useDB()
  return [
    DB.wallet_address,
    DB.wallet_address_loading
  ]
}
