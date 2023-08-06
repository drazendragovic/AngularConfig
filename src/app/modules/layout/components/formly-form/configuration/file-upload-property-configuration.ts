import { PropertyConfiguration, PropertyConfigurationBuilder } from './property-configuration';
import { FormlyTemplate } from './formly-template';

export interface FileUploadPropertyConfiguration<T> extends PropertyConfiguration<T> {
  multiple(multiple?: boolean): this;
  getFileName(func: (file: any) => string): this;
  accept(fileTypes: string): this;
}

export class FileUploadPropertyConfigurationBuilder<T>
  extends PropertyConfigurationBuilder<T>
  implements FileUploadPropertyConfiguration<T>
{
  constructor(fieldId: string, formlyTemplate: FormlyTemplate) {
    super(undefined, formlyTemplate, fieldId);
    this.templateOption((o) => (o['getFileName'] = (file: any) => file?.filename ?? file?.name));
  }

  accept(fileTypes: string): this {
    this.templateOption((o) => (o['accept'] = fileTypes));
    return this;
  }

  getFileName(func: (file: any) => string): this {
    this.templateOption((o) => (o['getFileName'] = func));
    return this;
  }

  multiple(multiple = true): this {
    this.templateOption((o) => (o['multiple'] = multiple));
    return this;
  }
}
