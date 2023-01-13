import { LightningElement, wire } from 'lwc';
import ursusResources from '@salesforce/resourceUrl/ursus_park';
/** BearController.getAllBears() Apex method */
// import getAllBears from '@salesforce/apex/BearController.getAllBears';
import searchBears from '@salesforce/apex/BearController.searchBears';

export default class BearList extends LightningElement {
  searchTerm = '';
  @wire(searchBears, { searchTerm: '$searchTerm' })
  bears;
  appResources = {
    bearSilhouette: `${ursusResources}/standing-bear-silhouette.png`,
  };

  handleSearchTermChange(event){
    window.clearTimeout(this.delayTimeout);
    const searchTerm = event.target.value;
    this.delayTimeout = setTimeout(() =>{
      this.searchTerm = searchTerm;
    },300)
  }

  get hasResults() {
    return (this.bears.data.length > 0);
  }
}
