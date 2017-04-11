import { combineReducers } from 'redux'

import selectedShipments from './selected-shipment'
import shipments from './shipments'

export default combineReducers({
  selectedShipments,
  shipments
})
