import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortStringComponent } from './short-string/short-string.component';
import { DateComponent } from './date/date.component';
import { DateTimeComponent } from './date-time/date-time.component';
import { BoolSelectButtonComponent } from './bool-select-button/bool-select-button.component';
import { BoolSwitchComponent } from './bool-switch/bool-switch.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { MultiselectDropdownComponent } from './multiselect-dropdown/multiselect-dropdown.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { MultiselectAutoCompleteComponent } from './multiselect-auto-complete/multiselect-auto-complete.component';
import { NumberComponent } from './number/number.component';
import { LongStringComponent } from './long-string/long-string.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';
import { EditControlContainerComponent } from './edit-control-container/edit-control-container.component';
import { UIInputNumber } from './number/ui-number/ui-input-number.component';
import { CheckboxComponent } from './checkbox/checkbox.component';

@NgModule({
  declarations: [
    ActionButtonsComponent,
    AutoCompleteComponent,
    BoolSelectButtonComponent,
    BoolSwitchComponent,
    CheckboxComponent,
    DateComponent,
    DateTimeComponent,
    DropdownComponent,
    EditControlContainerComponent,
    FileUploadComponent,
    LongStringComponent,
    MultiselectAutoCompleteComponent,
    MultiselectDropdownComponent,
    NumberComponent,
    ShortStringComponent,
    UIInputNumber,
  ],
  exports: [
    AutoCompleteComponent,
    BoolSelectButtonComponent,
    BoolSwitchComponent,
    CheckboxComponent,
    DateComponent,
    DateTimeComponent,
    DropdownComponent,
    EditControlContainerComponent,
    FileUploadComponent,
    LongStringComponent,
    MultiselectAutoCompleteComponent,
    MultiselectDropdownComponent,
    NumberComponent,
    ShortStringComponent,
    UIInputNumber,
  ],
  imports: [
    AutoCompleteModule,
    CalendarModule,
    CheckboxModule,
    CommonModule,
    DropdownModule,
    FileUploadModule,
    FormsModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextareaModule,
    InputTextModule,
    MultiSelectModule,
    ReactiveFormsModule,
    SelectButtonModule,
    TooltipModule,
  ],
})
export class UIFormsModule {}
