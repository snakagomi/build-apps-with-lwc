import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import BEAR_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/BearListUPdate__c'

export default class BearMap extends LightningElement {
  mapMakers = [];
  subscription = null;

  @wire(MessageContext)
  messageContext;

  connectedCallback(){
    // Subscribe to BearListUPdate__c message
    this.subscription = subscribe(
      this.messageContext,
      BEAR_LIST_UPDATE_MESSAGE,
      (message) => {
        this.handleBearListUpdates(message);
      }
    );
  }

  disconnectedCallback(){
    // Unsubscribe from BearListUpdate__c message
    unsubscribe(this.subscription);
    this.subscription = null;
  }

  handleBearListUpdates(message) {
    this.mapMakers = message.bears.map(bear => {
      const Latitude = bear.Location__Latitude__s;
      const Longitude = bear.Location__Longitude__s;
      return{
        location: {Latitude, Longitude},
        title: bear.Name,
        description: `Coords: ${Latitude} - ${Longitude}`,
        icon: 'utility:animal_and_nature'
      }
    })
  }
}