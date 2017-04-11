import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { launchWorkflow } from './actions'
import Grid from './grid'

const Main = ({
  launchWorkflow,
  selectedShipments
}) => {
  return (
    <div className='main' >
      <div className='header'>
        {
          selectedShipments.length
            ? (
              <button
                onClick={() => { launchWorkflow() }}
              >
                {`Launch a worflow for ${selectedShipments.length} shipments.`}
              </button>
            )
            : 'Select some shipments to get started.'
        }
      </div>
      <Grid />
    </div>
  )
}

Main.displayName = 'Main'

Main.propTypes = {
  selectedShipments: PropTypes.arrayOf(PropTypes.number).isRequired
}

export default connect(
  ({
    selectedShipments
  }) => ({
    selectedShipments
  }),
  { launchWorkflow }
)(Main)
