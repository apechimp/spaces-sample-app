import React, { PropTypes } from 'react'
import ReactDataGrid from 'react-data-grid'
import { connect } from 'react-redux'

import {
  deselectShipments,
  selectShipments
} from './actions'

const Grid = ({
  deselectShipments,
  selectShipments,
  selectedShipments,
  shipments
}) => {
  const columns = []
  for (let key of Object.keys(shipments[0])) {
    columns.push({ key, name: key })
  }

  return (
    <ReactDataGrid
      rowKey='Bill of lading Nbr.'
      columns={columns}
      rowGetter={(i) => shipments[i]}
      rowsCount={shipments.length}
      rowSelection={{
        enableShiftSelect: true,
        onRowsDeselected: (rows) => {
          deselectShipments(
            rows.map((row) => row.rowIdx)
          )
        },
        onRowsSelected: (rows) => {
          selectShipments(
            rows.map((row) => row.rowIdx)
          )
        },
        selectBy: {
          indexes: selectedShipments
        },
        showCheckbox: true
      }}
    />
  )
}

Grid.displayName = 'Grid'

Grid.propTypes = {
  shipments: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired
}

export default connect(
  ({
    selectedShipments,
    shipments
  }) => ({
    selectedShipments,
    shipments
  }),
  {
    deselectShipments,
    selectShipments
  }
)(Grid)
