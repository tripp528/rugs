import * as helpers from 'model/helpers'
import { useDB, useDispatch } from 'model/model'

// App wide hooks

export { useDispatch, useDB }

export function useSomething() {
  const DB = useDB()
  return [
    helpers.get_something(DB),
    DB.something_loading
  ]
}

export function useWalletAddress() {
  const DB = useDB()
  return [
    DB.wallet_address,
    DB.wallet_address_loading
  ]
}
