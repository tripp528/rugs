import * as utils from 'utils'
import * as helpers from 'model/helpers'


export const start_sleep = (action, draft) => {
  draft.sleeping = true
}


export const end_sleep = (action, draft) => {
  draft.sleeping = false
}


export const set_something = (action, draft) => {
  draft.something = action.value
}


export const set_wallet_address = (action, draft) => {
  draft.wallet_address = action.value
}

export const set_wallet_address_loading = (action, draft) => {
  draft.wallet_address_loading = action.value
}
