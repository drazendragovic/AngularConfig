import { PropertyConfiguration, PropertyConfigurationBuilder } from './property-configuration';
import { FormlyTemplate } from './formly-template';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { LookupDataSource } from 'src/app/core';
import { DropdownColumn } from '../components';
import { UtilsService } from 'src/app/core/utils/utils.service';

export interface DropdownPropertyConfiguration<T> extends PropertyConfiguration<T> {
  dataSource(dataSource: () => LookupDataSource): this;

  cascadeFrom(...fields: (keyof T | MappedField<T>)[]): this;

  additionalDropdownColumns(config: (d: DropdownColumnConfiguration<T>) => DropdownColumnConfiguration<T>): this;

  hideClear(): this;

  filter(): this;
}

export interface MappedField<T> {
  field: keyof T;
  as: string;
  keepValueOnChange?: boolean;
}

export class DropdownColumnConfiguration<T> {
  columns: DropdownColumn[] = [];

  add(field: string, size?: number): DropdownColumnConfiguration<T> {
    this.columns = [...this.columns, { field, size }];
    return this;
  }
}

export class DropdownPropertyConfigurationBuilder<T> extends PropertyConfigurationBuilder<T> implements DropdownPropertyConfiguration<T> {
  constructor(fieldName: keyof T, formlyTemplate: FormlyTemplate) {
    super(fieldName, formlyTemplate);
  }

  hideClear(): this {
    this.templateOption((o) => (o['hideClear'] = true));
    return this;
  }

  filter(): this {
    this.templateOption((o) => (o['filter'] = true));
    return this;
  }

  additionalDropdownColumns(config: (d: DropdownColumnConfiguration<T>) => DropdownColumnConfiguration<T>): this {
    const builder = config(new DropdownColumnConfiguration<T>());
    this.config.props = this.config.props ?? {};
    let columns: DropdownColumn[] = this.config.props['dropdownColumns'] ?? [];
    columns = [...columns, ...builder.columns];
    this.templateOption((o) => (o['dropdownColumns'] = columns));

    return this;
  }

  dataSource(dataSourceFactory: () => LookupDataSource): this {
    this.templateOption((o) => (o['dataSourceFactory'] = dataSourceFactory));
    return this;
  }

  cascadeFrom(...fields: (keyof T | MappedField<T>)[]): this {
    const fieldName = (f: keyof T | MappedField<T>): string =>
      typeof f === 'string' ? (f as string) : ((f as MappedField<T>).field as string);
    const asField = (f: keyof T | MappedField<T>): string => (typeof f === 'string' ? (f as string) : ((f as MappedField<T>).as as string));
    const keepValueOnChange = (f: keyof T | MappedField<T>): boolean =>
      typeof f === 'string' ? false : !!(f as MappedField<T>).keepValueOnChange;

    const getFilter = (form: FormGroup) => {
      const filter: any = {};
      for (const field of fields) {
        filter[asField(field)] = form.controls[fieldName(field)]?.value;
      }
      return filter;
    };

    for (const field of fields) {
      const fldName = fieldName(field);
      const builder = this.parent.rootConfiguration.flatFields.find((x) => x.fieldName === fldName);
      if (!builder) {
        throw new Error(`Field ${fldName} is not yet defined.`);
      }

      this.config.props = this.config.props ?? {};
      this.config.props['dataSourceCascadeFilter'] = getFilter;

      builder.onChange((fld) => {
        const form = fld.form as FormGroup;
        const thisField = this.findFieldInParent(fld?.parent);
        if (!thisField) {
          throw new Error(`Control with name ${String(this.fieldName)} was not found in the same FormGroup.`);
        }

        const filter = getFilter(form);
        thisField.props = thisField.props ?? {};

        // If filters are equal there is not need to filter with the same equal again.
        // Another side effect is that unwanted change on parent lookup will trigger deletion of child lookup value
        if (!UtilsService.deepEqual(thisField.props['lastCascadeFilter'], filter) && thisField.props['dataSource']) {
          thisField.props['lastCascadeFilter'] = filter;
          thisField.props['dataSource'].cascadeFilter(filter);
          if (!keepValueOnChange(field)) {
            thisField.formControl?.setValue(undefined);
          }
        }
      });
    }

    return this;
  }

  private findFieldInParent(parent: FormlyFieldConfig | undefined): FormlyFieldConfig | undefined {
    let field = this.findFieldInFieldGroup(parent?.fieldGroup);
    if (field) return field;
    if (parent?.parent) field = this.findFieldInParent(parent?.parent);
    return field;
  }

  private findFieldInFieldGroup(fieldGroup: FormlyFieldConfig[] | undefined): FormlyFieldConfig | undefined {
    if (fieldGroup == null) return undefined;

    let field = fieldGroup.find((x) => x.key == this.fieldName);
    if (field) return field;

    for (let int = 0; int < fieldGroup.length; int++) {
      field = this.findFieldInFieldGroup(fieldGroup[int].fieldGroup);
      if (field) break;
    }
    return field;
  }
}
