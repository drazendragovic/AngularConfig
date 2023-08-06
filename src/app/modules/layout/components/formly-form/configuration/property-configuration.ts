import { FormlyFieldConfig, FormlyFieldProps } from '@ngx-formly/core';
import { __rest } from 'tslib';
import { Observable } from 'rxjs';
import { auditTime, tap } from 'rxjs/operators';
import { FormlyTemplate } from './formly-template';
import { UIFormlyConfigurationBuilder } from './ui-formly-configuration';
import { ActionConfiguration, UiAction } from 'src/app/core';

export interface PropertyConfiguration<T> {
  required(required?: boolean): this;

  templateOption(option: (o: FormlyFieldProps) => void): this;

  expressionProperty(property: string, expression: ((model: T, formState: any, field?: FormlyFieldConfig) => any) | Observable<any>): this;

  hideExpression(expression: boolean | string | ((model: T, formState: any, field?: FormlyFieldConfig) => boolean)): this;

  disableOnEmpty(fieldName: keyof T): this;

  hideOnEmpty(fieldName: keyof T): this;

  remove(remove: boolean): this;

  /**
   * Adds a function which should be executed when this property changes.
   *
   * @param {(initial: boolean) => void} onChangeFn Function which should be executed when change is triggered.
   * */
  onChange(onChangeFn: (field: FormlyFieldConfig) => void): this;

  /**
   * Adds a function which should be executed when this property named in `fieldName` parameter changes.
   *
   * @param {keyof T} fieldName Name of the property whose changes is monitored.
   * @param {(initial: boolean) => void} changesOnFn Function which should be executed when change is triggered.
   * */
  changesOn(fieldName: keyof T, changesOnFn: () => void): this;

  wrappers(wrappers: string[]): this;

  className(className: string): this;

  addAction(
    label: string,
    icon: string,
    action: ($event: any, data?: any) => void,
    config?: (c: ActionConfiguration<T>) => ActionConfiguration<T>
  ): this;

  defaultValue(defaultValue: any): this;
}

export class PropertyConfigurationBuilder<T> implements PropertyConfiguration<T> {
  readonly fieldName?: keyof T;
  readonly fieldId?: string;
  formlyTemplate?: FormlyTemplate;
  protected readonly config: FormlyFieldConfig;
  protected parent!: UIFormlyConfigurationBuilder<T>;
  protected changeFuncs: ((field: FormlyFieldConfig) => void)[] = [];
  protected onInitFuncs: ((field: FormlyFieldConfig) => any)[] = [];
  protected fieldGroupConfigurationBuilder?: UIFormlyConfigurationBuilder<any>;
  public removed = false;
  protected detailForm = false;

  constructor(fieldName?: keyof T, formlyTemplate?: FormlyTemplate, fieldId?: string) {
    this.config = {
      props: {},
      expressionProperties: {},
      hooks: {},
    };
    this.fieldName = fieldName;
    this.fieldId = fieldId;
    this.formlyTemplate = formlyTemplate;
  }

  protected get safeFieldName(): keyof T {
    return this.fieldName as keyof T;
  }

  initialize(parent: UIFormlyConfigurationBuilder<T>): void {
    this.parent = parent;
  }

  hasClassName(): boolean {
    return this.config.className !== undefined;
  }

  remove(remove: boolean): this {
    this.removed = remove;
    return this;
  }

  initializeAsFormGroup(parent: UIFormlyConfigurationBuilder<T>, builder: UIFormlyConfigurationBuilder<T>): void {
    this.initialize(parent);
    this.fieldGroupConfigurationBuilder = builder;
  }

  initializeAsDetailForm<TDetail>(builder: UIFormlyConfigurationBuilder<TDetail>): void {
    this.detailForm = true;
    this.fieldGroupConfigurationBuilder = builder;
  }

  expressionProperty(property: string, expression: ((model: T, formState: any, field?: FormlyFieldConfig) => any) | Observable<any>): this {
    this.config.props = this.config.props ?? {};
    this.config.props[property] = expression;
    return this;
  }

  required(required = true): this {
    this.config.props = this.config.props ?? {};
    this.config.props.required = required;
    return this;
  }

  template(template: string): this {
    this.config.template = template;
    return this;
  }

  getConfiguration(): FormlyFieldConfig {
    if (!this.config.wrappers) {
      this.config.wrappers = ['default'];
    }

    if (this.config.props['actions']?.length) {
      this.onInitFuncs = [
        ...this.onInitFuncs,
        (field) => {
          if (field.props['actions']) {
            for (const action of field.props['actions']) {
              const originalAction = action.action;
              action.action = ($event: any, data: any) => {
                originalAction($event, field.model);
              };
            }
          }
        },
      ];
    }

    if (this.changeFuncs.length) {
      this.onInitFuncs = [
        ...this.onInitFuncs,
        (fld: FormlyFieldConfig) => {
          return fld.formControl?.valueChanges.pipe(
            auditTime(0),
            tap(() => {
              for (const changeFunc of this.changeFuncs) {
                changeFunc(fld);
              }
            })
          );
        },
      ];
    }

    if (this.onInitFuncs.length) {
      this.config.hooks = this.config.hooks ?? {};
      this.config.hooks.onInit = (field) => {
        let retValue: any;
        for (const onInitFunc of this.onInitFuncs) {
          retValue = onInitFunc(field as FormlyFieldConfig);
        }
        return retValue;
      };
    }

    const f = __rest(this.config, ['key', 'type', 'fieldGroupConfigurationBuilder']);
    return {
      key: this.fieldName,
      type: this.formlyTemplate,
      fieldGroup:
        this.fieldGroupConfigurationBuilder && !this.detailForm ? this.fieldGroupConfigurationBuilder.getConfiguration().fields : undefined,
      fieldArray:
        this.fieldGroupConfigurationBuilder && this.detailForm
          ? {
              fieldGroup: this.fieldGroupConfigurationBuilder.getConfiguration().fields,
              fieldGroupClassName:
                this.fieldGroupConfigurationBuilder && this.detailForm && this.config.props['inlineForm'] ? 'formgrid grid' : undefined,
              className: this.config.className,
            }
          : undefined,
      id: this.fieldId,
      ...f,
    };
  }

  label(label: string): this {
    this.config.props = this.config.props ?? {};
    this.config.props.label = label;
    return this;
  }

  toggleable(togle: boolean): this {
    this.config.props = this.config.props ?? {};
    this.config.props['togle'] = togle;
    return this;
  }

  collapsed(collaps: boolean): this {
    this.config.props = this.config.props ?? {};
    this.config.props['collaps'] = collaps;
    return this;
  }

  hideExpression(expression: boolean | string | ((model: T, formState: any, field?: FormlyFieldConfig) => boolean)): this {
    this.config.hideExpression = expression;
    return this;
  }

  templateOption(option: (o: FormlyFieldProps) => void): this {
    this.config.props = this.config.props ?? {};
    option(this.config.props);
    return this;
  }

  disableOnEmpty(fieldName: keyof T): this {
    this.expressionProperty('templateOptions.disabled', (m) => this.isValueEmpty(m[fieldName])).expressionProperty(
      `model.${String(this.safeFieldName)}`,
      (m) => (!this.isValueEmpty(m[fieldName]) ? m[this.safeFieldName] : undefined)
    );
    return this;
  }

  hideOnEmpty(fieldName: keyof T): this {
    this.hideExpression((m) => this.isValueEmpty(m[fieldName]));
    return this;
  }

  onChange(onChangeFn: (field: FormlyFieldConfig) => void): this {
    this.changeFuncs = [...this.changeFuncs, onChangeFn];
    return this;
  }

  changesOn(fieldName: keyof T, changesOnFn: () => void): this {
    this.parent.changesOnFn = { fieldName, changesOnFn };
    return this;
  }

  wrappers(wrappers?: string[]): this {
    this.config.wrappers = wrappers;
    return this;
  }

  className(className: string): this {
    this.config.className = className;
    return this;
  }

  fieldGroupClassName(className: string): this {
    this.config.fieldGroupClassName = className;
    return this;
  }

  addAction(
    label: string,
    icon: string,
    action: ($event: any, data?: any) => void,
    config?: (c: ActionConfiguration<T>) => ActionConfiguration<T>
  ): this {
    const unsupported: FormlyTemplate[] = ['BoolSelectButton', 'BoolSwitch', 'Checkbox'];
    if (unsupported.find((x) => x === this.formlyTemplate)) {
      throw new Error(`Function addAction is not supported for ${this.formlyTemplate} control.`);
    }

    const c = new ActionConfiguration<T>();
    if (config) {
      config(c);
    }

    this.config.props = this.config.props ?? {};
    let actions: UiAction[] = this.config.props['actions'] ?? [];
    actions = [
      ...actions,
      {
        label,
        action,
        icon,
        style: c.config.style,
        type: c.config.type,
        visible: c.config.visible,
        showLabel: c.config.showLabel,
        customClass: c.config.customClass,
      },
    ];
    this.templateOption((o) => (o['actions'] = actions));
    return this;
  }

  defaultValue(defaultValue: any): this {
    this.config.defaultValue = defaultValue;
    return this;
  }

  protected isValueEmpty(value: any) {
    if (!value) return true;
    if (Array.isArray(value)) return !(value as any[]).length;
    return false;
  }
}
