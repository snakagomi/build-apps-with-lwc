import {NavigationMixin} from 'lightning/navigation';
import { LightningElement, wire } from 'lwc';
import ursusResources from '@salesforce/resourceUrl/ursus_park';
/** BearController.getAllBears() Apex method */
import searchBears from '@salesforce/apex/BearController.searchBears';

export default class BearList extends NavigationMixin(LightningElement) {
  searchTerm = '';
  @wire(searchBears, { searchTerm: '$searchTerm' })
  bears;

  handleSearchTermChange(event) {
    window.clearTimeout(this.delayTimeout);
    const searchTerm = event.target.value;
    this.delayTimeout = setTimeout(() => {
      this.searchTerm = searchTerm;
    }, 300);
  }

  get hasResults() {
    return (this.bears.data.length > 0);
  }

  handleBearView(event){
    // Get bear record id from bearview event
		const bearId = event.detail;
		// Navigate to bear record page
    this[NavigationMixin.Navigate]({
      type: 'standard__recordPage',
      attributes: {
        recordId: bearId,
        objectApiName: 'Bear__c',
        actionName: 'view'
      }
    });
  }
}
