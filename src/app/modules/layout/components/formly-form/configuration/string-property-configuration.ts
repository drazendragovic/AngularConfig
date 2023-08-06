import { PropertyConfiguration, PropertyConfigurationBuilder } from './property-configuration';

export interface StringPropertyConfiguration<T> extends PropertyConfiguration<T> {
  maxLength(value: number): this;
  pattern(pattern: string, validationMessage: string): this;
}

export class StringPropertyConfigurationBuilder<T> extends PropertyConfigurationBuilder<T> implements StringPropertyConfiguration<T> {
  maxLength(value: number): this {
    this.templateOption((o) => (o['maxLen'] = value));
    return this;
  }

  pattern(pattern: string, validationMessage: string): this {
    this.templateOption((o) => {
      o.pattern = pattern;
      o['patternValidationMessage'] = validationMessage;
    });
    return this;
  }
}

export interface LongStringPropertyConfiguration<T> extends StringPropertyConfiguration<T> {
  rows(rows: number): this;
  autoResize(autoResize: boolean): this;
}

export class LongStringPropertyConfigurationBuilder<T>
  extends StringPropertyConfigurationBuilder<T>
  implements LongStringPropertyConfiguration<T>
{
  autoResize(autoResize: boolean): this {
    this.templateOption((o) => (o['autoResize'] = autoResize));
    return this;
  }

  rows(rows: number): this {
    this.templateOption((o) => (o['rws'] = rows));
    return this;
  }
}
