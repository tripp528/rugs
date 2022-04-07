import * as helpers from 'model/helpers'
import { useDB, useDispatch } from 'model/model'

// App wide hooks

export { useDispatch, useDB }


export function useWalletAddress() {
  const DB = useDB()
  return [
    DB.wallet_address,
    DB.wallet_address_loading
  ]
}
