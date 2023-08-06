import { PropertyConfiguration, PropertyConfigurationBuilder } from './property-configuration';
import { FormlyTemplate } from './formly-template';

export interface DatePropertyConfiguration<T> extends PropertyConfiguration<T> {
  rangeFrom(rangeFromField: keyof T): this;
  min(value: Date | undefined): this;
  max(value: Date | undefined): this;
  format(format: string | undefined): this;
}

export class DatePropertyConfigurationBuilder<T> extends PropertyConfigurationBuilder<T> implements DatePropertyConfiguration<T> {
  constructor(fieldName: keyof T, formlyTemplate: FormlyTemplate) {
    super(fieldName, formlyTemplate);
  }

  rangeFrom(rangeFromField: keyof T): this {
    this.expressionProperty(`model.${String(this.fieldName)}`, (m) =>
      m[rangeFromField] && m[this.safeFieldName] && m[this.safeFieldName] < m[rangeFromField] ? undefined : m[this.safeFieldName]
    ).expressionProperty('templateOptions.minDate', (m) => m[rangeFromField]);
    return this;
  }

  format(format: string | undefined): this {
    this.templateOption((o) => (o['format'] = format));
    return this;
  }

  max(value: Date | undefined): this {
    this.templateOption((o) => (o['maxDate'] = value));
    return this;
  }

  min(value: Date | undefined): this {
    this.templateOption((o) => (o['minDate'] = value));
    return this;
  }
}
