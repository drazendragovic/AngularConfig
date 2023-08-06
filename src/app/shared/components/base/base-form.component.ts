import { FormGroup } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IBaseModel } from 'src/app/shared/models/base-model/i-base-model';
import { FormState, UIFormlyConfigurationParams } from 'src/app/modules/layout/components/formly-form';
import { StructureInfo } from 'src/app/core/backend/structure/info';
import { SindikatiEntityService } from '../../services/sindikati/sindikati-entity-service';
import { SindikatiBackendRest } from '../../services/sindikati/sindikati-backend-rest';
import { Sifarnik } from 'src/app/modules/sifarnici/model/sifrarnik';

export abstract class BaseFormComponent<T extends IBaseModel> {
  public formState: FormState;
  public model: T;
  public dialogReference: DynamicDialogRef;
  public formlyConfiguration: UIFormlyConfigurationParams = { form: new FormGroup({}), fields: [] };
  public entityService: SindikatiEntityService<T>;

  protected customValidations: ((x: T) => string)[] = [];

  constructor(
    protected backendRest: SindikatiBackendRest,
    protected messageService: MessageService,
    protected entity: StructureInfo<T>,
    protected cdRef?: ChangeDetectorRef,
    route?: ActivatedRoute,
    router?: Router
  ) {
    this.entityService = backendRest.forEntityExt(entity);
  }

  public onSubmit(model: T, saveAndNew = false): void {
    this.ValidateForm();
    this.InsertUpdate(model, saveAndNew);
  }

  protected ValidateForm(): void {
    for (const controlsKey in this.formlyConfiguration.form.controls) {
      if (this.formlyConfiguration.form.controls.hasOwnProperty(controlsKey)) {
        this.formlyConfiguration.form.controls[controlsKey].markAllAsTouched();
        this.formlyConfiguration.form.controls[controlsKey].markAsDirty();
      }
    }
    this.formlyConfiguration.form.markAsDirty({ onlySelf: false });
  }

  protected InsertUpdate(model: T, saveAndNew = false): void {
    if (this.formlyConfiguration.form.valid) {
      if (model.id === null || (model.id === undefined && this.formState === FormState.New)) {
        this.entityService
          .saveWithMessage(model, FormState.New)
          .pipe(take(1))
          .subscribe((result) => {
            if (!saveAndNew) {
              this.dialogReference?.close(result);
            } else {
              this.clearModel();
            }
          });
      } else if (model.id !== null && model.id !== undefined && this.formState === FormState.Edit) {
        this.entityService
          .saveWithMessage(model, FormState.Edit)
          .pipe(take(1))
          .subscribe((result) => {
            if (!saveAndNew) {
              this.dialogReference?.close(result);
            } else {
              this.clearModel();
            }
          });
      }
    }
  }

  protected clearModel(): void {
    const nullModel: T = null;
    this.model = { ...nullModel };
    this.cdRef?.markForCheck();
  }

  handleCustomValidations(model: T, severity = 'error'): boolean {
    const validations = [];
    this.customValidations.forEach((x) => {
      const validation = x.bind(this, model).apply() as string;

      if (validation) {
        validations.push(validation);
        this.messageService.add({ sticky: severity.toLowerCase() === 'error', severity, summary: 'Obavijest', detail: validation });
      }
    });

    if (validations.length > 0) {
      return false;
    }

    return true;
  }

  public onCancel(severity?: string, summary?: string, detail?: string): void {
    setTimeout(() => {
      this.dialogReference?.close();
      this.messageService.add({ severity: severity, summary: summary, detail: detail });
    }, 0);
  }

  public getEntity(id): Observable<any> {
    return this.entityService.getEntityById(id);
  }

  public getStructureInfo(id): StructureInfo<any> {
    //napraviti switch za svaki Info iz Sifranika
    return Sifarnik.ClanStatusInfo;
  }
}
