import { UIFormlyConfigurationBuilder } from './ui-formly-configuration';
import { PropertyConfigurationBuilder } from './property-configuration';
import { FormlyTemplate } from './formly-template';
import { FormlyTemplateOptions } from '@ngx-formly/core';

export interface DetailFormConfiguration<T> {
  addButtonText(text: string): DetailFormConfiguration<T>;

  className(className: string): DetailFormConfiguration<T>;

  removeButtonText(text: string): DetailFormConfiguration<T>;

  inlineForm(inlineForm?: boolean): DetailFormConfiguration<T>;

  detailTemplate(template: string): DetailFormConfiguration<T>;

  fields(config: (fields: UIFormlyConfiguration<T>) => UIFormlyConfiguration<T>): DetailFormConfiguration<T>;

  templateOption(option: (o: FormlyTemplateOptions) => void): DetailFormConfiguration<T>;

  hideExpression(expression: boolean | string | ((model: T, formState: any) => boolean)): DetailFormConfiguration<T>;

  newItemFactory(fn: () => T): DetailFormConfiguration<T>;

  onRemove(fn): DetailFormConfiguration<T>;
}

export class DetailFormConfigurationBuilder<T> implements DetailFormConfiguration<T> {
  protected innerFormBuilder: UIFormlyConfigurationBuilder<T>;
  protected propertyBuilder: PropertyConfigurationBuilder<any>;
  private _inlineForm = false;

  constructor(fieldName: string, innerFormBuilder: UIFormlyConfigurationBuilder<T>) {
    this.innerFormBuilder = innerFormBuilder;
    this.propertyBuilder = new PropertyConfigurationBuilder<any>(fieldName, 'DetailForm');
    this.propertyBuilder.initializeAsDetailForm(this.innerFormBuilder);
  }

  getConfiguration(): PropertyConfigurationBuilder<any> {
    if (this._inlineForm) {
      for (const property of this.innerFormBuilder.properties) {
        if (!property.hasClassName()) {
          property.className('col');
        }
      }
    }
    return this.propertyBuilder;
  }

  addButtonText(text: string): DetailFormConfiguration<T> {
    this.templateOption((o) => (o['addText'] = text));
    return this;
  }

  className(className: string): DetailFormConfiguration<T> {
    this.propertyBuilder.className(className);
    return this;
  }

  removeButtonText(text: string): DetailFormConfiguration<T> {
    this.templateOption((o) => (o['removeText'] = text));
    return this;
  }

  fields(config: (fields: UIFormlyConfiguration<T>) => UIFormlyConfiguration<T>): DetailFormConfiguration<T> {
    config(this.innerFormBuilder as unknown as UIFormlyConfiguration<T>);
    return this;
  }

  templateOption(option: (o: FormlyTemplateOptions) => void): DetailFormConfiguration<T> {
    this.propertyBuilder.templateOption(option);
    return this;
  }

  inlineForm(inlineForm?: boolean): DetailFormConfiguration<T> {
    this._inlineForm = inlineForm === undefined || inlineForm;
    this.templateOption((o) => (o['inlineForm'] = this._inlineForm));
    return this;
  }

  detailTemplate(template: string): DetailFormConfiguration<T> {
    this.propertyBuilder.formlyTemplate = template as FormlyTemplate;
    return this;
  }

  hideExpression(expression: boolean | string | ((model: T, formState: any) => boolean)): this {
    this.propertyBuilder.hideExpression(expression);
    return this;
  }

  newItemFactory(fn: () => T): DetailFormConfiguration<T> {
    this.templateOption((o) => (o['newItemFactory'] = fn));
    return this;
  }

  onRemove(fn): DetailFormConfiguration<T> {
    this.templateOption((o) => (o['onRemove'] = fn));
    return this;
  }
}
