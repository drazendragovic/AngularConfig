import { DropdownPropertyConfigurationBuilder, DropdownPropertyConfiguration } from './dropdown-property-configuration';

export interface AutocompletePropertyConfiguration<T> extends DropdownPropertyConfiguration<T> {
  minSearchLength(minSearchLength: number): this;
}

export class AutocompletePropertyConfigurationBuilder<T>
  extends DropdownPropertyConfigurationBuilder<T>
  implements AutocompletePropertyConfiguration<T>
{
  minSearchLength(minSearchLength: number): this {
    this.templateOption((o) => (o.minLength = minSearchLength));
    return this;
  }
}
