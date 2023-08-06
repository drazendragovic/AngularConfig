import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { UI_CONFIG } from '@ngx-ui/core-ui';

@Component({
  selector: 'f-elastic-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ui-elastic-filter.component.html',
  styleUrls: ['./ui-elastic-filter.component.scss'],
})
export class UIElasticFilterComponent {
  constructor(@Inject(UI_CONFIG) private UiConfig: UIConfig) {}

  @Input() form = new FormGroup({});
  @Input() fields!: FormlyFieldConfig[];
  @Input() model!: any;
  @Input() searchIcon = this.UiConfig.icons.searchIcon;
  @Input() filterIcon = this.UiConfig.icons.filterIcon;
  @Input() banIcon = this.UiConfig.icons.banIcon;
  @Output() filter: EventEmitter<any> = new EventEmitter<any>();

  onSubmit(model: any): void {
    this.filter.emit(model);
  }

  onReset() {
    this.filter.emit({});
    this.form.reset();
  }
}
