/* eslint-disable @angular-eslint/no-forward-ref */
/* eslint-disable @angular-eslint/component-max-inline-declarations */
import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { initializeDataSource } from '../../api';
import { EchoField } from '../../echo-field';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { LookupDataSource } from 'src/app/core';

@Component({
  selector: 'dropdown-with-echo-fields-template',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div class="formgrid grid">
    <div class="{{ props['ddClassName'] }} field">
      <s-dropdown
        ngDefaultControl
        [formControl]="formControl"
        [formlyAttributes]="field"
        [label]="to?.label"
        [hidden]="to?.hidden"
        [dataSource]="props['dataSource']"
        [isRequired]="to.required !== undefined ? to.required : false"
        [dropdownColumns]="props['dropdownColumns']"
        [panelStyleClass]="props['panelStyleClass']"
        [isFiltered]="props['filter']"
      ></s-dropdown>
    </div>
    <div *ngFor="let echoField of props['echoFields']" class="{{ echoField.className }} field">
      <s-short-string [(ngModel)]="echoField.value" [disabled]="true" [label]="echoField.label"></s-short-string>
    </div>
  </div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownWithEchoFieldsTemplateComponent),
      multi: true,
    },
  ],
})
export class DropdownWithEchoFieldsTemplateComponent extends FieldType<FieldTypeConfig> implements OnInit, OnDestroy {
  private destroy$$ = new Subject<void>();

  ngOnInit(): void {
    initializeDataSource(this) as LookupDataSource;
    const dataSource = this.props['dataSource'] as LookupDataSource;

    dataSource.data$.pipe(takeUntil(this.destroy$$)).subscribe((x) => {
      const selectedObject = x.find((d: any) => d.ID == this.formControl.value);
      this.setEchoFields(selectedObject);
    });

    this.formControl.valueChanges.pipe(takeUntil(this.destroy$$)).subscribe((x) => {
      const selectedObject = dataSource.currentData().find((row) => row.ID == x);
      this.setEchoFields(selectedObject);
    });
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  setEchoFields(selectedObject: any): void {
    for (let i = 0; i < this.props['echoFields'].length; i++) {
      const echoField = this.props['echoFields'][i] as EchoField;

      if (selectedObject == null) {
        echoField.value = null;
        continue;
      }

      if (echoField.formatInput) echoField.value = echoField.formatInput(selectedObject[echoField.property]);
      else echoField.value = selectedObject[echoField.property];
    }
  }
}
