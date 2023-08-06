/* eslint-disable @angular-eslint/component-max-inline-declarations */
/* eslint-disable @angular-eslint/no-forward-ref */
import { AfterViewInit, ChangeDetectionStrategy, Component, forwardRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';
import { FileUploadComponent } from '../../components';

@Component({
  selector: 'file-upload-template',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <s-file-upload
    [formlyAttributes]="field"
    [hidden]="to?.hidden"
    [label]="to?.label"
    [multiple]="to?.['multiple'] ?? false"
    [actions]="to?.['actions']"
    [required]="to?.required ?? false"
    [getFileName]="to?.['getFileName']"
    [accept]="to?.['accept']"
    [chooseLabel]="to?.['chooseLabel'] ?? 'Odaberi'"
    [disabled]="to?.disabled ?? false"
  ></s-file-upload>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadTemplateComponent),
      multi: true,
    },
  ],
})
export class FileUploadTemplateComponent extends FieldType implements AfterViewInit {
  @ViewChild(FileUploadComponent) fileComponent!: FileUploadComponent;

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.props['componentInstance'] = this.fileComponent;
  }
}
