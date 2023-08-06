import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortStringTemplateComponent } from './templates/short-string-template/short-string-template.component';
import { DateTemplateComponent } from './templates/date-template/date-template.component';
import { BoolSelectButtonTemplateComponent } from './templates/bool-select-button-template/bool-select-button-template.component';
import { DropdownTemplateComponent } from './templates/dropdown-template/dropdown-template.component';
import { BoolSwitchTemplateComponent } from './templates/bool-switch-template/bool-switch-template.component';
import { DateTimeTemplateComponent } from './templates/date-time-template/date-time-template.component';
import { MultiselectDropdownTemplateComponent } from './templates/multiselect-dropdown-template/multiselect-dropdown-template.component';
import { AutoCompleteTemplateComponent } from './templates/auto-complete-template/auto-complete-template.component';
import { MultiselectAutoCompleteTemplateComponent } from './templates/multiselect-auto-complete-template/multiselect-auto-complete-template.component';
import { NumberTemplateComponent } from './templates/number-template/number-template.component';
import { LongStringTemplateComponent } from './templates/long-string-template/long-string-template.component';
import { FieldWrapperComponent } from './wrappers/field-wrapper.component';

import { FormlyModule } from '@ngx-formly/core';
import { FileUploadTemplateComponent } from './templates/file-upload-template/file-upload-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailFormTemplateComponent } from './templates/detail-form-template/detail-form-template.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { DropdownWithEchoFieldsTemplateComponent } from './templates/dropdown-with-echo-fields/dropdown-with-echo-fields-template.component';
import { PanelWrapperComponent } from './wrappers/panel-wrapper.component';
import { PanelModule } from 'primeng/panel';
import { UIFormsModule } from './components/ui-forms.module';
import { CheckboxTemplateComponent } from './templates/checkbox-template/checkbox-template.component';
import { TitleWrapperComponent } from './wrappers/title-wrapper.component';

@NgModule({
  declarations: [
    AutoCompleteTemplateComponent,
    BoolSelectButtonTemplateComponent,
    BoolSwitchTemplateComponent,
    CheckboxTemplateComponent,
    DateTemplateComponent,
    DateTimeTemplateComponent,
    DetailFormTemplateComponent,
    DropdownTemplateComponent,
    DropdownWithEchoFieldsTemplateComponent,
    FieldWrapperComponent,
    FileUploadTemplateComponent,
    LongStringTemplateComponent,
    MultiselectAutoCompleteTemplateComponent,
    MultiselectDropdownTemplateComponent,
    NumberTemplateComponent,
    PanelWrapperComponent,
    ShortStringTemplateComponent,
  ],
  imports: [
    ButtonModule,
    CommonModule,
    DividerModule,
    FormsModule,
    PanelModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      extras: { lazyRender: true },
      wrappers: [
        { name: 'default', component: FieldWrapperComponent },
        { name: 'secondary', component: PanelWrapperComponent },
        { name: 'title', component: TitleWrapperComponent },
      ],
      types: [
        { name: 'ShortString', component: ShortStringTemplateComponent },
        { name: 'LongString', component: LongStringTemplateComponent },
        { name: 'Date', component: DateTemplateComponent },
        { name: 'DateTime', component: DateTimeTemplateComponent },
        { name: 'BoolSelectButton', component: BoolSelectButtonTemplateComponent },
        { name: 'BoolSwitch', component: BoolSwitchTemplateComponent },
        { name: 'Checkbox', component: CheckboxTemplateComponent },
        { name: 'Dropdown', component: DropdownTemplateComponent },
        { name: 'MultiSelectDropdown', component: MultiselectDropdownTemplateComponent },
        { name: 'FileUpload', component: FileUploadTemplateComponent },
        { name: 'DropdownWithEchoFields', component: DropdownWithEchoFieldsTemplateComponent },
        { name: 'AutoComplete', component: AutoCompleteTemplateComponent },
        { name: 'MultiSelectAutoComplete', component: MultiselectAutoCompleteTemplateComponent },
        { name: 'Number', component: NumberTemplateComponent },
        { name: 'DetailForm', component: DetailFormTemplateComponent },
      ],
      validationMessages: [
        { name: 'required', message: 'Podatak je obavezan.' },
        { name: 'pattern', message: (err, field) => field.props?.['patternValidationMessage'] ?? 'Podatak nije ispravan.' },
        { name: 'min', message: (err, field) => `Minimalna dozvoljena vrijednost je ${field.props?.min}.` },
        { name: 'max', message: (err, field) => `Maksimalna dozvoljena vrijednost je ${field.props?.max}.` },
      ],
    }),
    RippleModule,
    UIFormsModule,
  ],
})
export class UIFormsFormlyModule {}
