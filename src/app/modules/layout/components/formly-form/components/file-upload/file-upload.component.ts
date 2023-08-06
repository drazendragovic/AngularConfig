/* eslint-disable @angular-eslint/no-forward-ref */
import { ChangeDetectionStrategy, Component, forwardRef, Inject, Input, ViewChild, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { BehaviorSubject, Observable } from 'rxjs';
import { ValueAccessorBase } from '../value-accessor-base';
import { UIConfig, UiAction, getButtonTypeClass } from 'src/app/core';
import { APP_CONFIG } from 'src/app/core/configuration/config.constants';

@Component({
  selector: 's-file-upload',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
})
export class FileUploadComponent extends ValueAccessorBase {
  @Input() multiple = false;
  @Input() accept!: string;
  @Input() chooseLabel = 'Odaberi';

  @ViewChild(FileUpload) fileUpload!: FileUpload;

  private filesSubject = new BehaviorSubject<any[]>([]);
  public uploadedFiles$: Observable<any[]> = this.filesSubject.asObservable();

  constructor(@Inject(APP_CONFIG) private config: UIConfig) {
    super(config);
  }

  @Input() getFileName: (file: any) => string = (file) => file?.name ?? file?.filename;

  setFiles(files: any[]): void {
    this.filesSubject.next(files);
  }

  actionClass(action: UiAction): string {
    return `p-action-button p-button-text ${getButtonTypeClass(action.type)}`;
  }

  actionsVisible(actions: UiAction[], file: any): boolean {
    return actions.find((action) => (action.visible ? action.visible(file) : true)) != undefined;
  }
}
