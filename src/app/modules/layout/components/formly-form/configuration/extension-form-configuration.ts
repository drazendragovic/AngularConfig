import { FormlyFieldProps } from '@ngx-formly/core';
import { UIFormlyConfigurationBuilder } from './ui-formly-configuration';
import { PropertyConfigurationBuilder } from './property-configuration';

export interface ExtensionFormConfiguration<T> {
  fields(config: (fields: UIFormlyConfiguration<T>) => UIFormlyConfiguration<T>): ExtensionFormConfiguration<T>;

  wrappers(wrappers: string[]): ExtensionFormConfiguration<T>;

  fieldGroupClassName(fieldGroupClassName: string): ExtensionFormConfiguration<T>;

  className(fieldGroupClassName: string): ExtensionFormConfiguration<T>;

  label(fieldGroupLabel: string): ExtensionFormConfiguration<T>;

  toggleable(togle: boolean): ExtensionFormConfiguration<T>;

  collapsed(collaps: boolean): ExtensionFormConfiguration<T>;

  templateOption(option: (o: FormlyFieldProps) => void): ExtensionFormConfiguration<T>;

  hideExpression(expression: boolean | string | ((model: T, formState: any) => boolean)): this;
}

export class ExtensionFormConfigurationBuilder<T> implements ExtensionFormConfiguration<T> {
  protected parent: UIFormlyConfigurationBuilder<any>;
  protected innerFormBuilder: UIFormlyConfigurationBuilder<T>;
  protected propertyBuilder: PropertyConfigurationBuilder<T>;

  constructor(fieldName: string, parent: UIFormlyConfigurationBuilder<any>, innerFormBuilder: UIFormlyConfigurationBuilder<T>) {
    this.parent = parent;
    this.innerFormBuilder = innerFormBuilder;
    this.propertyBuilder = new PropertyConfigurationBuilder<any>(fieldName);
    this.propertyBuilder.initializeAsFormGroup(parent, innerFormBuilder);
  }

  getConfiguration(): PropertyConfigurationBuilder<T> {
    return this.propertyBuilder;
  }

  fields(config: (fields: UIFormlyConfiguration<T>) => UIFormlyConfiguration<T>): ExtensionFormConfiguration<T> {
    config(this.innerFormBuilder as unknown as UIFormlyConfiguration<T>);
    return this;
  }

  wrappers(wrappers: string[]): ExtensionFormConfiguration<T> {
    this.propertyBuilder.wrappers(wrappers);
    return this;
  }

  className(className: string): ExtensionFormConfiguration<T> {
    this.propertyBuilder.className(className);
    return this;
  }

  label(label: string): ExtensionFormConfiguration<T> {
    this.propertyBuilder.label(label);
    return this;
  }

  toggleable(togle: boolean): ExtensionFormConfiguration<T> {
    this.propertyBuilder.toggleable(togle);
    return this;
  }

  collapsed(collaps: boolean): ExtensionFormConfiguration<T> {
    this.propertyBuilder.collapsed(collaps);
    return this;
  }

  fieldGroupClassName(fieldGroupClassName: string): ExtensionFormConfiguration<T> {
    this.propertyBuilder.fieldGroupClassName(fieldGroupClassName);
    return this;
  }

  templateOption(option: (o: FormlyFieldProps) => void): ExtensionFormConfiguration<T> {
    this.propertyBuilder.templateOption(option);
    return this;
  }

  hideExpression(expression: boolean | string | ((model: T, formState: any) => boolean)): this {
    this.propertyBuilder.hideExpression(expression);
    return this;
  }
}
