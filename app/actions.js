import axios from 'axios'
import jwtDecode from 'jwt-decode'
import url from 'url'

import {
  appApiName,
  gatewayUri,
  jwt,
  opportunityRecordTypeApiName,
  spaceId,
  uiUri,
  workflowTemplateApiName
} from './config'

export const RECEIVE_ITEM = 'RECEIVE_ITEM'
export const REQUEST_ITEM = 'REQUEST_ITEM'
export const fetchItem = (contentId) => async (dispatch) => {
  dispatch({ type: REQUEST_ITEM })
  const { data: item } = await axios(
    url.resolve(
      gatewayUri,
      `/v1/spaces/${spaceId}/apps/${appApiName}/content/${contentId}`
    ),
    {
      headers: { Authorization: `Bearer ${jwt}` }
    }
  )
  dispatch({
    type: RECEIVE_ITEM,
    item
  })
}

export const RECEIVE_LIST = 'RECEIVE_LIST'
export const REQUEST_LIST = 'REQUEST_LIST'
export const fetchList = () => async (dispatch) => {
  dispatch({ type: REQUEST_LIST })
  const { data: list } = await axios(
    url.resolve(
      gatewayUri,
      `/v1/spaces/${spaceId}/apps/${appApiName}/content`
    ),
    {
      headers: { Authorization: `Bearer ${jwt}` }
    }
  )
  dispatch({
    type: RECEIVE_LIST,
    list
  })
}

export const RECEIVE_LAUNCH_WORKFLOW = 'RECEIVE_LAUNCH_WORKFLOW'
export const REQUEST_LAUNCH_WORKFLOW = 'REQUEST_LAUNCH_WORKFLOW'
export const launchWorkflow = () => async (dispatch) => {
  dispatch({ type: REQUEST_LAUNCH_WORKFLOW })
  const { id: userId } = jwtDecode(jwt)
  const { data: { lanetix: { id: recordId } } } = await axios(
    url.resolve(
      gatewayUri,
      `/v1/records/${opportunityRecordTypeApiName}`
    ),
    {
      headers: { Authorization: `Bearer ${jwt}` },
      method: 'POST',
      data: {
        name: 'Trade Lane Optimization',
        owner_id: userId
      }
    }
  )
  const [ , { data: { id: spaceId } } ] = await Promise.all([
    axios(
      url.resolve(
        gatewayUri,
        `/v1/workflows/${opportunityRecordTypeApiName}/${recordId}/${workflowTemplateApiName}`
      ),
      {
        headers: { Authorization: `Bearer ${jwt}` },
        method: 'POST'
      }
    ),
    axios(
      url.resolve(
        gatewayUri,
        `/v1/spaces/record/${opportunityRecordTypeApiName}/${recordId}`,
      ),
      {
        headers: { Authorization: `Bearer ${jwt}` }
      }
    )
  ])
  dispatch({
    type: RECEIVE_LAUNCH_WORKFLOW,
    recordId
  })
  window.top.location = url.resolve(
    uiUri,
    `/spaces/${spaceId}/workflows/${workflowTemplateApiName}`
  )
}

export const DESELECT_SHIPMENTS = 'DESELECT_SHIPMENTS'
export const deselectShipments = (shipmentIndices) => ({
  type: DESELECT_SHIPMENTS,
  shipmentIndices
})

export const SELECT_SHIPMENTS = 'SELECT_SHIPMENTS'
export const selectShipments = (shipmentIndices) => ({
  type: SELECT_SHIPMENTS,
  shipmentIndices
})
