import { FormlyTemplate } from './formly-template';
import { DropdownPropertyConfiguration, DropdownPropertyConfigurationBuilder } from './dropdown-property-configuration';
import { EchoField } from '../echo-field';

export interface DropdownWithEchoFieldsPropertyConfiguration<T> extends DropdownPropertyConfiguration<T> {
  echoField(property: string, label: string, className?: string, formatInput?: (d: any) => string): this;
  ddClassName(className: string): this;
}

export class EchoFieldConfiguration {
  echoFields: EchoField[] = [];

  add(property: string, label: string, className?: string, formatInput?: (d: any) => string): EchoFieldConfiguration {
    this.echoFields = [
      ...this.echoFields,
      { property: property, label: label, className: className, formatInput: formatInput, value: undefined },
    ];
    return this;
  }
}

export class DropdownWithEchoFieldsPropertyConfigurationBuilder<T>
  extends DropdownPropertyConfigurationBuilder<T>
  implements DropdownWithEchoFieldsPropertyConfiguration<T>
{
  constructor(fieldName: keyof T, formlyTemplate: FormlyTemplate) {
    super(fieldName, formlyTemplate);
  }

  ddClassName(className: string): this {
    this.templateOption((x) => (x['ddClassName'] = className));
    return this;
  }

  echoField(property: string, label: string, className?: string, formatInput?: (d: any) => string): this {
    const builder = new EchoFieldConfiguration();
    builder.add(property, label, className, formatInput);

    this.config.props = this.config.props ?? {};
    let echoFields: EchoField[] = this.config.props['echoFields'] ?? [];
    echoFields = [...echoFields, ...builder.echoFields];
    this.templateOption((o) => (o['echoFields'] = echoFields));

    return this;
  }
}
