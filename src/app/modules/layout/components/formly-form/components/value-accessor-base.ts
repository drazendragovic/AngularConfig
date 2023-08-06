import { Directive, Input } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { UiAction } from 'src/app/core/models/uiAction';
import { UIConfig } from 'src/app/core/models/uiConfig';
class UIFormControl extends FormControl {}

@Directive()
export abstract class ValueAccessorBase implements ControlValueAccessor {
  @Input() value?: any;
  @Input() disabled = false;
  protected initialFormControl = new UIFormControl();
  @Input() formControl = this.initialFormControl;
  @Input() required = false;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() floatingLabel = true;
  @Input() actions: UiAction[] = [];

  protected changed = new Array<(value: any | undefined) => void>();
  protected touched = new Array<() => void>();

  protected constructor(config: UIConfig) {
    this.floatingLabel = config.floatingLabel;
  }

  public writeValue(value: any | undefined): void {
    if (this.formControl instanceof UIFormControl) {
      this.formControl.setValue(value);
    }
    this.value = value;
  }

  formControlRequired(): boolean {
    return this.formControl.enabled && !!this.formControl.validator && !!this.formControl.validator(new FormControl())?.['required'];
  }

  public registerOnChange(fn: (value: any | undefined) => void): void {
    this.changed.push(fn);
  }

  public registerOnTouched(fn: () => void): void {
    this.touched.push(fn);
  }

  public onTouched(): void {
    this.formControl.markAsDirty();
    this.touched.forEach((f) => f());
  }

  public onChanged(value: any): void {
    if (value === null) value = undefined;

    this.value = value;
    this.changed.forEach((f) => f(this.value));
    this.touched.forEach((f) => f());
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
