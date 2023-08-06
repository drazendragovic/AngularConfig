import { PropertyConfiguration, PropertyConfigurationBuilder } from './property-configuration';

export interface NumberPropertyConfiguration<T> extends PropertyConfiguration<T> {
  min(value: number | undefined): this;
  max(value: number | undefined): this;
  useGrouping(value: boolean): this;
  fractionDigits(min?: number, max?: number): this;
  rangeFrom(rangeFromField: keyof T): this;
}

export class NumberPropertyConfigurationBuilder<T> extends PropertyConfigurationBuilder<T> implements NumberPropertyConfiguration<T> {
  max(value: number | undefined): this {
    this.templateOption((o) => (o.max = value));
    return this;
  }

  min(value: number | undefined): this {
    this.templateOption((o) => (o.min = value));
    return this;
  }

  useGrouping(value: boolean): this {
    this.templateOption((o) => (o['useGrouping'] = value));
    return this;
  }

  fractionDigits(min?: number, max?: number): this {
    if (min && !max) max = min;
    if (!min && max) min = 0;
    this.templateOption((o) => (o['minFractionDigits'] = min));
    this.templateOption((o) => (o['maxFractionDigits'] = max));
    return this;
  }

  rangeFrom(rangeFromField: keyof T): this {
    this.expressionProperty(`model.${String(this.fieldName)}`, (m) =>
      m[rangeFromField] && m[this.safeFieldName] && m[this.safeFieldName] < m[rangeFromField] ? undefined : m[this.safeFieldName]
    ).expressionProperty('templateOptions.min', (m) => m[rangeFromField]);
    return this;
  }
}
