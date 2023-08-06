import { FormlyFieldProps } from '@ngx-formly/core';
import { UIFormlyConfigurationBuilder } from './ui-formly-configuration';
import { PropertyConfigurationBuilder } from './property-configuration';

export interface FieldGroupConfiguration<T> {
  fields(config: (fields: UIFormlyConfiguration<T>) => UIFormlyConfiguration<T>): FieldGroupConfiguration<T>;

  wrappers(wrappers: string[]): FieldGroupConfiguration<T>;

  className(className: string): FieldGroupConfiguration<T>;

  label(label: string): FieldGroupConfiguration<T>;

  toggleable(togle: boolean): FieldGroupConfiguration<T>;

  collapsed(collaps: boolean): FieldGroupConfiguration<T>;

  templateOption(option: (o: FormlyFieldProps) => void): FieldGroupConfiguration<T>;

  hideExpression(expression: boolean | string | ((model: T, formState: any) => boolean)): this;
}

export class FieldGroupConfigurationBuilder<T> implements FieldGroupConfiguration<T> {
  protected parent: UIFormlyConfigurationBuilder<T>;
  protected innerFormBuilder: UIFormlyConfigurationBuilder<T>;
  protected propertyBuilder: PropertyConfigurationBuilder<T>;

  constructor(parent: UIFormlyConfigurationBuilder<T>, innerFormBuilder: UIFormlyConfigurationBuilder<T>) {
    this.parent = parent;
    this.innerFormBuilder = innerFormBuilder;
    this.propertyBuilder = new PropertyConfigurationBuilder<T>();
    this.propertyBuilder.initializeAsFormGroup(parent, innerFormBuilder);
  }

  getConfiguration(): PropertyConfigurationBuilder<T> {
    return this.propertyBuilder;
  }

  fields(config: (fields: UIFormlyConfiguration<T>) => UIFormlyConfiguration<T>): FieldGroupConfiguration<T> {
    config(this.innerFormBuilder as unknown as UIFormlyConfiguration<T>);
    return this;
  }

  wrappers(wrappers: string[]): FieldGroupConfiguration<T> {
    this.propertyBuilder.wrappers(wrappers);
    return this;
  }

  className(className: string): FieldGroupConfiguration<T> {
    this.propertyBuilder.fieldGroupClassName(className);
    return this;
  }

  label(label: string): FieldGroupConfiguration<T> {
    this.propertyBuilder.label(label);
    return this;
  }

  toggleable(togle: boolean): FieldGroupConfiguration<T> {
    this.propertyBuilder.toggleable(togle);
    return this;
  }

  collapsed(collaps: boolean): FieldGroupConfiguration<T> {
    this.propertyBuilder.collapsed(collaps);
    return this;
  }

  templateOption(option: (o: FormlyFieldProps) => void): FieldGroupConfiguration<T> {
    this.propertyBuilder.templateOption(option);
    return this;
  }

  hideExpression(expression: boolean | string | ((model: T, formState: any) => boolean)): this {
    this.propertyBuilder.hideExpression(expression);
    return this;
  }
}
