import querystring from 'querystring'

const { search } = window.location
export const {
  appApiName,
  contentId,
  jwt,
  recordId,
  recordTypeApiName,
  spaceId
} = querystring.parse(search.substring(1)) // substring to remove the ?
console.debug('appApiName', appApiName)
console.debug('contentId', contentId)
console.debug('jwt', jwt)
console.debug('recordId', recordId)
console.debug('recordTypeApiName', recordTypeApiName)
console.debug('spaceId', spaceId)

export const gatewayUri = process.env.GATEWAY_URI || 'http://localhost:5027'
export const opportunityRecordTypeApiName = 'tender'
export const uiUri = process.env.UI_URI || 'http://localhost:6001'
export const workflowTemplateApiName = 'trade_lane_optimization'
