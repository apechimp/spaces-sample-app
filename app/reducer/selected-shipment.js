import {
  DESELECT_SHIPMENTS,
  SELECT_SHIPMENTS
} from '../actions'

export default (state = [], action) => {
  switch (action.type) {
    case DESELECT_SHIPMENTS: {
      const { shipmentIndices } = action
      return state.filter((index) => shipmentIndices.indexOf(index) === -1)
    }
    case SELECT_SHIPMENTS: {
      const { shipmentIndices } = action
      return state.concat(shipmentIndices)
    }
    default:
      return state
  }
}
