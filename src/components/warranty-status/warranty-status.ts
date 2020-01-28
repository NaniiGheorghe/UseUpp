import { Component, Input, SimpleChanges } from '@angular/core';
import { WarrantyStatus } from "../../model/WarrantyStatus";

/**
 * Generated class for the WarrantyStatusComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'warranty-status',
  templateUrl: 'warranty-status.html'
})
export class WarrantyStatusComponent {

  @Input('warrantyStatus')
  warrantyStatus: WarrantyStatus;
  leftText: string = '';
  rightText: string = '';
  isExpired = false;
  isExpiring = false;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateOutput(changes.warrantyStatus.currentValue);    
  }

  private updateOutput(warrantyStatus: WarrantyStatus) {
    if (warrantyStatus != null) {
      if (warrantyStatus.remainingDays > 0) {
        this.leftText = 'Expires on ' + warrantyStatus.endDate.toISOString().slice(0,10);
        this.rightText = warrantyStatus.remainingDays + " days remaining";

        if (warrantyStatus.remainingDays < 31) {
          this.isExpiring = true;
        }
      }
      else if (warrantyStatus.endDate) {
        this.leftText = 'Expired on ' + warrantyStatus.endDate.toISOString().slice(0,10);
        this.rightText = '';
        this.isExpired = true;
      }
      else {
        this.leftText = '';
        this.rightText = '';
        this.isExpired = false;
      }
    }
  }

}
