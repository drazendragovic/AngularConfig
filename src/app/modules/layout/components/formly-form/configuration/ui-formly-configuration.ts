import { FormlyFieldConfig } from '@ngx-formly/core';
import { PropertyConfiguration, PropertyConfigurationBuilder } from './property-configuration';
import { DropdownPropertyConfiguration, DropdownPropertyConfigurationBuilder } from './dropdown-property-configuration';
import { DatePropertyConfiguration, DatePropertyConfigurationBuilder } from './date-property-configuration';
import { FormGroup } from '@angular/forms';
import { NumberPropertyConfiguration, NumberPropertyConfigurationBuilder } from './number-property-configuration';
import {
  LongStringPropertyConfiguration,
  LongStringPropertyConfigurationBuilder,
  StringPropertyConfiguration,
  StringPropertyConfigurationBuilder,
} from './string-property-configuration';
import { FormlyTemplate } from './formly-template';
import { FileUploadPropertyConfiguration, FileUploadPropertyConfigurationBuilder } from './file-upload-property-configuration';
import { DetailFormConfiguration, DetailFormConfigurationBuilder } from './detail-form-configuration';
import {
  DropdownWithEchoFieldsPropertyConfiguration,
  DropdownWithEchoFieldsPropertyConfigurationBuilder,
} from './dropdown-with-echo-fields-property-configuration';
import { AutocompletePropertyConfiguration, AutocompletePropertyConfigurationBuilder } from './autocomplete-property-configuration';
import { FieldGroupConfiguration, FieldGroupConfigurationBuilder } from './fieldgroup-configuration';
import { ExtensionFormConfigurationBuilder, ExtensionFormConfiguration } from './extension-form-configuration';

export enum FormState {
  New = 'New',
  Edit = 'Edit',
  ReadOnly = 'ReadOnly',
}

export type FormlyKeyValue<TModel, ControlType> = {
  [K in keyof TModel]: TModel[K] extends ControlType | null | undefined ? K & string : never;
}[keyof TModel];

export interface UIFormlyConfigurationParams {
  readonly form: FormGroup;
  fields: FormlyFieldConfig[];
}

declare global {
  export interface UIFormlyConfiguration<T> {
    form: FormGroup;

    shortString(
      fieldName: FormlyKeyValue<T, string>,
      label: string,
      config?: (c: StringPropertyConfiguration<T>) => StringPropertyConfiguration<T>
    ): UIFormlyConfiguration<T>;

    longString(
      fieldName: FormlyKeyValue<T, string>,
      label: string,
      config?: (c: LongStringPropertyConfiguration<T>) => LongStringPropertyConfiguration<T>
    ): UIFormlyConfiguration<T>;

    date(
      fieldName: FormlyKeyValue<T, Date>,
      label: string,
      config?: (c: DatePropertyConfiguration<T>) => DatePropertyConfiguration<T>
    ): UIFormlyConfiguration<T>;

    dateTime(
      fieldName: FormlyKeyValue<T, Date>,
      label: string,
      config?: (c: DatePropertyConfiguration<T>) => DatePropertyConfiguration<T>
    ): UIFormlyConfiguration<T>;

    boolSelectButton(
      fieldName: FormlyKeyValue<T, boolean>,
      trueLabel: string,
      falseLabel: string,
      config?: (c: PropertyConfiguration<T>) => PropertyConfiguration<T>
    ): UIFormlyConfiguration<T>;

    boolSwitch(
      fieldName: FormlyKeyValue<T, boolean>,
      label: string,
      config?: (c: PropertyConfiguration<T>) => PropertyConfiguration<T>
    ): UIFormlyConfiguration<T>;

    checkbox(
      fieldName: FormlyKeyValue<T, boolean>,
      label: string,
      config?: (c: PropertyConfiguration<T>) => PropertyConfiguration<T>
    ): UIFormlyConfiguration<T>;

    dropDown(
      fieldName: FormlyKeyValue<T, string>,
      label: string,
      config?: (c: DropdownPropertyConfiguration<T>) => DropdownPropertyConfiguration<T>
    ): UIFormlyConfiguration<T>;

    dropDownWithEchoFields(
      fieldName: FormlyKeyValue<T, string>,
      label: string,
      config?: (c: DropdownWithEchoFieldsPropertyConfiguration<T>) => DropdownWithEchoFieldsPropertyConfiguration<T>
    ): UIFormlyConfiguration<T>;

    multiSelectDropdown(
      fieldName: FormlyKeyValue<T, string[]>,
      label: string,
      config?: (c: DropdownPropertyConfiguration<T>) => DropdownPropertyConfiguration<T>
    ): UIFormlyConfiguration<T>;

    autoComplete(
      fieldName: FormlyKeyValue<T, string>,
      label: string,
      config?: (c: AutocompletePropertyConfiguration<T>) => AutocompletePropertyConfiguration<T>
    ): UIFormlyConfiguration<T>;

    multiSelectAutoComplete(
      fieldName: FormlyKeyValue<T, string[]>,
      label: string,
      config?: (c: AutocompletePropertyConfiguration<T>) => AutocompletePropertyConfiguration<T>
    ): UIFormlyConfiguration<T>;

    integer(
      fieldName: FormlyKeyValue<T, number>,
      label: string,
      config?: (c: NumberPropertyConfiguration<T>) => NumberPropertyConfiguration<T>
    ): UIFormlyConfiguration<T>;

    money(
      fieldName: FormlyKeyValue<T, number>,
      label: string,
      config?: (c: NumberPropertyConfiguration<T>) => NumberPropertyConfiguration<T>
    ): UIFormlyConfiguration<T>;

    decimal(
      fieldName: FormlyKeyValue<T, number>,
      label: string,
      config?: (c: NumberPropertyConfiguration<T>) => NumberPropertyConfiguration<T>
    ): UIFormlyConfiguration<T>;

    fileUpload(
      fieldId: string,
      label: string,
      config?: (c: FileUploadPropertyConfiguration<T>) => FileUploadPropertyConfiguration<T>
    ): UIFormlyConfiguration<T>;

    removeField(fieldName: keyof T): UIFormlyConfiguration<T>;

    modifyField<C extends PropertyConfiguration<T>>(fieldName: keyof T, config: (c: C) => C): UIFormlyConfiguration<T>;

    addField(
      fieldName: keyof T,
      label: string,
      formlyTemplate: string,
      config?: (c: PropertyConfiguration<T>) => PropertyConfiguration<T>
    ): UIFormlyConfiguration<T>;

    disabledFieldsOnEdit(...fields: (keyof T)[]): UIFormlyConfiguration<T>;

    disabledFieldsOnNew(...fields: (keyof T)[]): UIFormlyConfiguration<T>;

    formState(formState: FormState): UIFormlyConfiguration<T>;

    fieldGroup(config: (c: FieldGroupConfiguration<T>) => FieldGroupConfiguration<T>): UIFormlyConfiguration<T>;

    template(template: string, config?: (c: PropertyConfiguration<T>) => PropertyConfiguration<T>): UIFormlyConfiguration<T>;

    extensionForm<TExtension>(
      fieldName: FormlyKeyValue<T, TExtension>,
      config: (c: FieldGroupConfiguration<TExtension>) => FieldGroupConfiguration<TExtension>
    ): UIFormlyConfiguration<T>;

    detailForm<TDetail>(
      fieldName: FormlyKeyValue<T, any[]>,
      config: (c: DetailFormConfiguration<TDetail>) => DetailFormConfiguration<TDetail>
    ): UIFormlyConfiguration<T>;
  }
}

export interface IChangesOnFn<T> {
  fieldName: keyof T;
  changesOnFn: () => void;
}

export interface RootConfiguration<T> {
  flatFields: PropertyConfigurationBuilder<T>[];
  formState: FormState;
  disabledFieldsOnEdit?: string[];
  disabledFieldsOnNew?: string[];
}

export class UIFormlyConfigurationBuilder<T> implements Partial<UIFormlyConfiguration<T>> {
  readonly form: FormGroup;
  public readonly rootConfiguration: RootConfiguration<T>;
  private readonly configuration: UIFormlyConfigurationParams;

  constructor(form?: FormGroup, rootConfiguration?: RootConfiguration<T>) {
    this.rootConfiguration = rootConfiguration ?? {
      flatFields: [],
      formState: FormState.New,
      disabledFieldsOnEdit: [],
      disabledFieldsOnNew: [],
    };
    this.form = form ?? new FormGroup({});
    this.configuration = {
      form: this.form,
      fields: [],
    };
  }

  protected _changesOnFn: IChangesOnFn<T>[] = [];

  public set changesOnFn(val: IChangesOnFn<T>) {
    this._changesOnFn.push(val);
  }

  private _properties: PropertyConfigurationBuilder<any>[] = [];

  public get properties(): PropertyConfigurationBuilder<any>[] {
    return this._properties;
  }

  asInterface(): UIFormlyConfiguration<T> {
    return this as unknown as UIFormlyConfiguration<T>;
  }

  extensionForm<TExtension>(
    fieldName: FormlyKeyValue<T, TExtension>,
    config: (c: ExtensionFormConfiguration<TExtension>) => ExtensionFormConfiguration<TExtension>
  ): UIFormlyConfiguration<T> {
    const builder = this.createChildBuilder<TExtension>(this.form, {
      formState: this.rootConfiguration.formState,
      disabledFieldsOnNew: [],
      disabledFieldsOnEdit: [],
      flatFields: [],
    });
    const detailBuilder = new ExtensionFormConfigurationBuilder<TExtension>(
      fieldName,
      this,
      builder as unknown as UIFormlyConfigurationBuilder<TExtension>
    );
    config(detailBuilder);

    const configBuilder = detailBuilder.getConfiguration();
    this._properties = [...this._properties, configBuilder];
    return this.asInterface();
  }

  fieldGroup(config: (c: FieldGroupConfiguration<T>) => FieldGroupConfiguration<T>): UIFormlyConfiguration<T> {
    const builder = this.createChildBuilder<T>(this.form, this.rootConfiguration);
    const fieldGroupBuilder = new FieldGroupConfigurationBuilder<T>(this, builder as unknown as UIFormlyConfigurationBuilder<T>);
    config(fieldGroupBuilder);

    const configBuilder = fieldGroupBuilder.getConfiguration();
    this._properties = [...this._properties, configBuilder];
    return this.asInterface();
  }

  detailForm<TDetail>(
    fieldName: FormlyKeyValue<T, any[]>,
    config: (c: DetailFormConfiguration<TDetail>) => DetailFormConfiguration<TDetail>
  ): UIFormlyConfiguration<T> {
    const builder = this.createChildBuilder<TDetail>(this.form, {
      formState: this.rootConfiguration.formState,
      disabledFieldsOnNew: [],
      disabledFieldsOnEdit: [],
      flatFields: [],
    });
    const detailBuilder = new DetailFormConfigurationBuilder<TDetail>(
      fieldName,
      builder as unknown as UIFormlyConfigurationBuilder<TDetail>
    );
    config(detailBuilder);

    const configBuilder = detailBuilder.getConfiguration();
    this._properties = [...this._properties, configBuilder];
    return this.asInterface();
  }

  disabledFieldsOnEdit(...fields: (keyof T)[]): UIFormlyConfiguration<T> {
    this.rootConfiguration.disabledFieldsOnEdit = fields.map((f) => f as string);
    return this.asInterface();
  }

  disabledFieldsOnNew(...fields: (keyof T)[]): UIFormlyConfiguration<T> {
    this.rootConfiguration.disabledFieldsOnNew = fields.map((f) => f as string);
    return this.asInterface();
  }

  formState(formState: FormState): UIFormlyConfiguration<T> {
    this.rootConfiguration.formState = formState;
    return this.asInterface();
  }

  getConfiguration(): UIFormlyConfigurationParams {
    this._changesOnFn.forEach((fn) => {
      this.rootConfiguration.flatFields.find((x) => x.fieldName === fn.fieldName)?.onChange(fn.changesOnFn);
    });

    this.configuration.fields = this._properties.map((p) => {
      const fieldConfig = p.getConfiguration();
      fieldConfig.props = fieldConfig.props ?? {};
      fieldConfig.expressionProperties = fieldConfig.expressionProperties ?? {};
      fieldConfig.props['disabledFn'] = fieldConfig.props['templateOptions.disabled'] as (m: T) => boolean;
      fieldConfig.props['disabledInitial'] = !!fieldConfig.props?.disabled;

      fieldConfig.expressionProperties['templateOptions.disabled'] = (model: any, formState: any, field) => {
        if (field) {
          field.props = field.props ?? {};
          formState = typeof formState === 'string' ? formState : this.rootConfiguration.formState;
          const disabled =
            !!field.props['disabledInitial'] ||
            !!(field.props['disabledFn'] && field.props['disabledFn'](model)) ||
            this.calculateDisabled(field.key as string, formState);
          return disabled;
        }
        return false;
      };
      return fieldConfig;
    });

    return this.configuration;
  }

  removeField(fieldName: keyof T): UIFormlyConfiguration<T> {
    this._properties = this._properties.filter((value) => value.fieldName !== fieldName);
    return this as unknown as UIFormlyConfiguration<T>;
  }

  modifyField<C extends PropertyConfiguration<T>>(fieldName: keyof T, config: (c: C) => C): UIFormlyConfiguration<T> {
    const fieldConfig = this._properties.find((x) => x.fieldName === fieldName);
    if (!fieldConfig) {
      throw new Error(`Field ${String(fieldName)} does not exist.`);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config(fieldConfig);
    return this as unknown as UIFormlyConfiguration<T>;
  }

  template(template: string, config?: (c: PropertyConfiguration<T>) => PropertyConfiguration<T>): UIFormlyConfiguration<T> {
    const configBuilder = new PropertyConfigurationBuilder<T>();
    configBuilder.template(template);
    return this.add(configBuilder, undefined, config);
  }

  addField(
    fieldName: keyof T,
    label: string,
    formlyTemplate: string,
    config?: (c: PropertyConfiguration<T>) => PropertyConfiguration<T>
  ): UIFormlyConfiguration<T> {
    return this.add(new PropertyConfigurationBuilder<T>(fieldName, formlyTemplate as FormlyTemplate), label, config);
  }

  date(
    fieldName: FormlyKeyValue<T, Date>,
    label: string,
    config?: (c: DatePropertyConfiguration<T>) => DatePropertyConfiguration<T>
  ): UIFormlyConfiguration<T> {
    return this.add(new DatePropertyConfigurationBuilder<T>(fieldName, 'Date'), label, config);
  }

  dateTime(
    fieldName: FormlyKeyValue<T, Date>,
    label: string,
    config?: (c: DatePropertyConfiguration<T>) => DatePropertyConfiguration<T>
  ): UIFormlyConfiguration<T> {
    return this.add(new DatePropertyConfigurationBuilder<T>(fieldName, 'DateTime'), label, config);
  }

  boolSelectButton(
    fieldName: FormlyKeyValue<T, boolean>,
    trueLabel: string,
    falseLabel: string,
    config?: (c: PropertyConfiguration<T>) => PropertyConfiguration<T>
  ): UIFormlyConfiguration<T> {
    const builder = new PropertyConfigurationBuilder<T>(fieldName, 'BoolSelectButton');
    builder.templateOption((o) => (o['trueLabel'] = trueLabel)).templateOption((o) => (o['falseLabel'] = falseLabel));
    return this.add(builder, undefined, config);
  }

  boolSwitch(
    fieldName: FormlyKeyValue<T, boolean>,
    label: string,
    config?: (c: PropertyConfiguration<T>) => PropertyConfiguration<T>
  ): UIFormlyConfiguration<T> {
    return this.add(new PropertyConfigurationBuilder<T>(fieldName, 'BoolSwitch'), label, config);
  }

  checkbox(
    fieldName: FormlyKeyValue<T, boolean>,
    label: string,
    config?: (c: PropertyConfiguration<T>) => PropertyConfiguration<T>
  ): UIFormlyConfiguration<T> {
    return this.add(new PropertyConfigurationBuilder<T>(fieldName, 'Checkbox'), label, config);
  }

  dropDown(
    fieldName: FormlyKeyValue<T, string>,
    label: string,
    config?: (c: DropdownPropertyConfiguration<T>) => DropdownPropertyConfiguration<T>
  ): UIFormlyConfiguration<T> {
    return this.add(new DropdownPropertyConfigurationBuilder<T>(fieldName, 'Dropdown'), label, config);
  }

  multiSelectDropdown(
    fieldName: FormlyKeyValue<T, string[]>,
    label: string,
    config?: (c: DropdownPropertyConfiguration<T>) => DropdownPropertyConfiguration<T>
  ): UIFormlyConfiguration<T> {
    return this.add(new DropdownPropertyConfigurationBuilder<T>(fieldName, 'MultiSelectDropdown'), label, config);
  }

  dropDownWithEchoFields(
    fieldName: FormlyKeyValue<T, string>,
    label: string,
    config?: (c: DropdownWithEchoFieldsPropertyConfiguration<T>) => DropdownWithEchoFieldsPropertyConfiguration<T>
  ): UIFormlyConfiguration<T> {
    return this.add(new DropdownWithEchoFieldsPropertyConfigurationBuilder<T>(fieldName, 'DropdownWithEchoFields'), label, config);
  }

  fileUpload(
    fieldId: string,
    label: string,
    config?: (c: FileUploadPropertyConfiguration<T>) => FileUploadPropertyConfiguration<T>
  ): UIFormlyConfiguration<T> {
    return this.add(new FileUploadPropertyConfigurationBuilder<T>(fieldId, 'FileUpload'), label, config);
  }

  autoComplete(
    fieldName: FormlyKeyValue<T, string>,
    label: string,
    config?: (c: AutocompletePropertyConfiguration<T>) => AutocompletePropertyConfiguration<T>
  ): UIFormlyConfiguration<T> {
    return this.add(new AutocompletePropertyConfigurationBuilder<T>(fieldName, 'AutoComplete'), label, config);
  }

  multiSelectAutoComplete(
    fieldName: FormlyKeyValue<T, string[]>,
    label: string,
    config?: (c: AutocompletePropertyConfiguration<T>) => AutocompletePropertyConfiguration<T>
  ): UIFormlyConfiguration<T> {
    return this.add(new AutocompletePropertyConfigurationBuilder<T>(fieldName, 'MultiSelectAutoComplete'), label, config);
  }

  shortString(
    fieldName: FormlyKeyValue<T, string>,
    label: string,
    config?: (c: StringPropertyConfiguration<T>) => StringPropertyConfiguration<T>
  ): UIFormlyConfiguration<T> {
    return this.add(new StringPropertyConfigurationBuilder<T>(fieldName, 'ShortString'), label, config);
  }

  longString(
    fieldName: FormlyKeyValue<T, string>,
    label: string,
    config?: (c: LongStringPropertyConfiguration<T>) => LongStringPropertyConfiguration<T>
  ): UIFormlyConfiguration<T> {
    return this.add(new LongStringPropertyConfigurationBuilder<T>(fieldName, 'LongString'), label, config);
  }

  integer(
    fieldName: FormlyKeyValue<T, number>,
    label: string,
    config?: (c: NumberPropertyConfiguration<T>) => NumberPropertyConfiguration<T>
  ): UIFormlyConfiguration<T> {
    const builder = new NumberPropertyConfigurationBuilder<T>(fieldName, 'Number');
    builder.fractionDigits(0, 0);
    return this.add(builder, label, config);
  }

  money(
    fieldName: FormlyKeyValue<T, number>,
    label: string,
    config?: (c: NumberPropertyConfiguration<T>) => NumberPropertyConfiguration<T>
  ): UIFormlyConfiguration<T> {
    const builder = new NumberPropertyConfigurationBuilder<T>(fieldName, 'Number');
    builder.fractionDigits(2, 2);
    return this.add(builder, label, config);
  }

  decimal(
    fieldName: FormlyKeyValue<T, number>,
    label: string,
    config?: (c: NumberPropertyConfiguration<T>) => NumberPropertyConfiguration<T>
  ): UIFormlyConfiguration<T> {
    const builder = new NumberPropertyConfigurationBuilder<T>(fieldName, 'Number');
    builder.fractionDigits(4, 4);
    return this.add(builder, label, config);
  }

  protected add<C extends PropertyConfiguration<T>, B extends PropertyConfigurationBuilder<T>>(
    configBuilder: B,
    label?: string,
    config?: (c: C) => C
  ) {
    configBuilder.initialize(this);

    if (label) {
      configBuilder.label(label);
    }
    if (config) {
      config(configBuilder as unknown as C);
      if (configBuilder.removed === true) {
        return this.asInterface();
      }
    }

    this._properties = [...this._properties, configBuilder];
    this.rootConfiguration.flatFields.push(configBuilder);
    return this.asInterface();
  }

  protected createChildBuilder<TModel>(form: FormGroup, rootConfiguration: RootConfiguration<TModel>): UIFormlyConfiguration<TModel> {
    return new UIFormlyConfigurationBuilder<TModel>(form, rootConfiguration).asInterface();
  }

  private calculateDisabled(fieldName: string, formState: FormState): boolean {
    switch (formState) {
      case FormState.New:
        if (!this.rootConfiguration.disabledFieldsOnNew) return false;
        return this.rootConfiguration.disabledFieldsOnNew.includes(fieldName);
      case FormState.Edit:
        if (!this.rootConfiguration.disabledFieldsOnEdit) return false;
        return this.rootConfiguration.disabledFieldsOnEdit.includes(fieldName);
      case FormState.ReadOnly:
        return true;
    }

    return false;
  }
}
