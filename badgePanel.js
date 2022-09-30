/* This is free to use under the terms in LICENCE file
*  Please keep these comments, and the LICENCE file in place (even if modified)
*  I hope you get some use out this :)
*  Copyright (c) 2022 Scott Lee
*/

import { LightningElement, api, wire, track } from 'lwc'
import { getRecord } from 'lightning/uiRecordApi'
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

let fieldListArray
export default class BadgePanel extends LightningElement {

  @api recordId
  @api objectApiName
  @api fieldNames //Target property
  @api iconNames //Target property
  @api colors //Target property
  @api modes //Target property

  //error property - implement your own error display
  //good examples with errorPanel at lwc-recipes
  error
  currentObjectMeta
  currentRecordData
  fieldNameArray = []
  iconArray = []
  colorArray = []
  modeArray = []

  @track badgeData

  renderedCallback() {

    if(this.fieldNameArray.length > 0){
      return
    }
    this.fieldNameArray = this.fieldNames.split(',')
    //build list of fields for getRecord wire
    fieldListArray = this.fieldNameArray.map(i => this.objectApiName + '.' + i);

    this.iconArray = this.iconNames.split(',')
    this.colorArray = this.colors.split(',')
    this.modeArray = this.modes.split(',')
    }

   @wire(getRecord, {
    recordId: '$recordId',
    fields: fieldListArray
    })
    wiredRecord({ error, data }) {
      if (data) {
        this.currentRecordData = data
        this.createBadges()

      } else if (error) {
        this.error = error
      }
    }

  @wire(getObjectInfo, { objectApiName: '$objectApiName' })
  wiredObject({ error, data }) {
    if (data){
        this.currentObjectMeta = data
        this.createBadges()

    } else if (error) {
        this.error = error
    }
  }

  createBadges(){
    if(!(this.currentObjectMeta && this.currentRecordData )){
      return
    }
    this.badgeData = new Array()
    for (let index = 0; index < this.fieldNameArray.length; index++) {
      //only create badge if there is a value.
      let fieldName = this.fieldNameArray[index]
      if (!this.currentRecordData.fields[fieldName].value){
        //No value or false
        continue
      }
      let badgeObject = {}

      badgeObject.key = index
      badgeObject.icon = this.iconArray[index]

      switch(this.colorArray[index]){
        case 'Warning':
        case 'Error':
        case 'Success':
          badgeObject.class = 'slds-var-m-vertical_small icon-white-foreground slds-theme_' + this.colorArray[index].toLowerCase()
          break;
        case 'Darker':
            badgeObject.class = 'slds-var-m-vertical_small icon-white-foreground slds-badge_inverse'
          break;
        case 'Lightest':
          badgeObject.class = 'slds-var-m-vertical_small slds-badge_lightest'
          break;
        case 'Default':
        default:
          badgeObject.class = 'slds-var-m-vertical_small slds-badge'
      }

      switch(this.modeArray[index]){
        case 'Label':
          badgeObject.label = this.currentObjectMeta.fields[fieldName].label
          break;
        case 'Value':
          badgeObject.label = this.currentRecordData.fields[fieldName].value
          break;
        case 'Both':
        default:
          badgeObject.label = this.currentObjectMeta.fields[fieldName].label + ': ' + this.currentRecordData.fields[fieldName].value
      }
      this.badgeData.push(badgeObject)
    }
  }
}
