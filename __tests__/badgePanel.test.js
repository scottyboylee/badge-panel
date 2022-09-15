import { createElement } from 'lwc'
import BadgePanel from 'c/badgePanel'
import { getRecord } from 'lightning/uiRecordApi'
import { getObjectInfo } from 'lightning/uiObjectInfoApi'

// Mock realistic data
const mockGetRecord = require('./data/wireGetRecordResponse.json')
const mockGetObjectInfo = require('./data/getObjectInfo.json')


describe('c-badge-panel', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild)
    }
    // Prevent data saved on mocks from leaking between tests
    jest.clearAllMocks()
  })

  // Helper function to wait until the microtask queue is empty. This is needed for promise
  // timing when calling imperative Apex.
  async function flushPromises() {
    return Promise.resolve()
  }

  it('display single success badge', async () => {

    const element = createElement('c-badge-panel', {
      is: BadgePanel
    })

    element.fieldNames = 'Name'
    element.iconNames = 'utility:success'
    element.colors = 'Success'
    element.modes = 'Both'
    element.objectApiName = 'Account'
    element.recordId = '0017700000ALicvAAD'

    document.body.appendChild(element)
    
    // Emit data from @wires
    getRecord.emit(mockGetRecord)
    getObjectInfo.emit(mockGetObjectInfo)

    await flushPromises()

    const badges = element.shadowRoot.querySelectorAll(
      'lightning-badge'
    )
    expect(badges.length).toEqual(1)
    expect(badges[0].label).toEqual('Account Name: User User')
    expect(badges[0].iconName).toEqual('utility:success')
    expect(badges[0].className).toEqual('slds-var-m-vertical_small icon-white-foreground slds-theme_success')
  })

  it('display three badges success, darker and lightest',async () => {

    const element = createElement('c-badge-panel', {
      is: BadgePanel
    })

    element.fieldNames = 'Name,Site,Custom_Field__c'
    element.iconNames = 'utility:success,utility:warning,utility:end_call'
    element.colors = 'Success,Darker,Lightest'
    element.modes = 'Both,Label,Value'
    element.objectApiName = 'Account'
    element.recordId = '0017700000ALicvAAD'

    document.body.appendChild(element)
    
    // Emit data from @wires
    getRecord.emit(mockGetRecord)
    getObjectInfo.emit(mockGetObjectInfo)

    await flushPromises()
    const badges = element.shadowRoot.querySelectorAll(
      'lightning-badge'
    )
    expect(badges.length).toEqual(3)
    expect(badges[0].className).toEqual('slds-var-m-vertical_small icon-white-foreground slds-theme_success')
    
  })

  it('display three badges,warning,error and default',async () => {

    const element = createElement('c-badge-panel', {
      is: BadgePanel
    })

    element.fieldNames = 'Site,Email,Name'
    element.iconNames = 'utility:wanring,utility:error,utility:delete'
    element.colors = 'Warning,Error,Default'
    element.modes = 'Both,Both,Both'
    element.objectApiName = 'Account'
    element.recordId = '0017700000ALicvAAD'

    document.body.appendChild(element)
    
    getRecord.emit(mockGetRecord)
    getObjectInfo.emit(mockGetObjectInfo)

    // Wait for any asynchronous DOM updates
    await flushPromises()
    const badges = element.shadowRoot.querySelectorAll(
      'lightning-badge'
    )
    expect(badges.length).toEqual(3)
    expect(badges[0].label).toEqual('Site: Site Value')
    expect(badges[0].iconName).toEqual('utility:wanring')
    expect(badges[0].className).toEqual('slds-var-m-vertical_small icon-white-foreground slds-theme_warning')
  })

  it('only display one darker badge as one field has no value',async () => {

    const element = createElement('c-badge-panel', {
      is: BadgePanel
    })

    element.fieldNames = 'Field_No_Value__c,Email'
    element.iconNames = 'utility:success,utility:warning'
    element.colors = 'Success,Darker'
    element.modes = 'Label,Both'
    element.objectApiName = 'Account'
    element.recordId = '0017700000ALicvAAD'

    document.body.appendChild(element)
    
    // Emit data from @wires
    getRecord.emit(mockGetRecord)
    getObjectInfo.emit(mockGetObjectInfo)

    await flushPromises()
    
    const badges = element.shadowRoot.querySelectorAll(
      'lightning-badge'
    )
    expect(badges.length).toEqual(1)
    expect(badges[0].label).toEqual('Email: someuser@salesforce.com')
    expect(badges[0].iconName).toEqual('utility:warning')
    expect(badges[0].className).toEqual('slds-var-m-vertical_small icon-white-foreground slds-badge_inverse')

  })

  it('error displayed on getrecord wire',async () => {
    // Create initial element
    const element = createElement('c-badge-panel', {
      is: BadgePanel
    })

    element.fieldNames = 'Name'
    element.iconNames = 'utility:success'
    element.colors = 'Success'
    element.modes = 'Both'
    element.objectApiName = 'Account'
    element.recordId = '0017700000ALicvAAD'

    document.body.appendChild(element)

    // Emit error from @wire
    getRecord.error()

    await flushPromises()

    const errorDiv = element.shadowRoot.querySelector(
      'div[data-id="errorDiv"]'
    )
    expect(errorDiv).not.toBeNull()
  })

  it('error displayed on getobject wire',async () => {
    // Create initial element
    const element = createElement('c-badge-panel', {
      is: BadgePanel
    })

    element.fieldNames = 'Name'
    element.iconNames = 'utility:success'
    element.colors = 'Success'
    element.modes = 'Both'
    element.objectApiName = 'Account'
    element.recordId = '0017700000ALicvAAD'

    document.body.appendChild(element)

    // Emit error from @wire
    getObjectInfo.error()

    await flushPromises()

    const errorDiv = element.shadowRoot.querySelector(
      'div[data-id="errorDiv"]'
    )
    expect(errorDiv).not.toBeNull()
  })

})
