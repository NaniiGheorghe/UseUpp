import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { WarrantyStatusComponent } from './warranty-status/warranty-status';
import { EditProductComponent } from './edit-product/edit-product';
@NgModule({
	declarations: [ProgressBarComponent,
    WarrantyStatusComponent,
    EditProductComponent],
	imports: [],
	exports: [ProgressBarComponent,
    WarrantyStatusComponent,
    EditProductComponent]
})
export class ComponentsModule {}
