import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { InfoPlaceholderComponent } from './components/info-placeholder/info-placeholder.component';
import { AppSpinnerComponent } from './components/app-spinner/app-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material';
@NgModule({
    declarations: [InfoPlaceholderComponent, AppSpinnerComponent],
    imports:[
        CommonModule,
        FlexLayoutModule,
        MatProgressSpinnerModule
    ],
    exports: [
        CommonModule,
        FlexLayoutModule,
        InfoPlaceholderComponent,
        AppSpinnerComponent
    ]
})
export class SharedModule{}