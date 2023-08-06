import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { ToolbarButton, ToolbarConfigurationParams } from '../toolbar-configuration';
import { ButtonStyle, ChangeMessageService, UI_CONFIG, getButtonStyleClass, getButtonTypeClass } from '@ngx-ui/core-ui';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'f-toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ui-toolbar.component.html',
  styleUrls: ['./ui-toolbar.component.scss'],
})
export class UIToolbarComponent implements OnInit, OnDestroy {
  @Output() buttonClicked: EventEmitter<ToolbarButton> = new EventEmitter<ToolbarButton>();
  @Input() model!: ToolbarConfigurationParams;

  private destroy$$ = new Subject();

  constructor(
    @Inject(UI_CONFIG) private config: UIConfig,
    private cdRef: ChangeDetectorRef,
    @Optional() private changeMessageService: ChangeMessageService
  ) {}

  ngOnInit(): void {
    if (this.changeMessageService) {
      this.changeMessageService.tableSelectionChanged.pipe(takeUntil(this.destroy$$)).subscribe(() => {
        this.cdRef.detectChanges();
      });

      this.changeMessageService.dataChanged.pipe(takeUntil(this.destroy$$)).subscribe(() => {
        this.cdRef.markForCheck();
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  onClick(btn: ToolbarButton): void {
    this.buttonClicked.emit(btn);
  }

  getButtonStyle(button: ToolbarButton): string {
    const labelSize = button.icon && this.showLabel(button) ? 'p-small-button-label' : '';
    return `${getButtonStyleClass(
      button.style ?? this.model.defaultButtonStyle ?? (this.config.defaultButtonStyle as ButtonStyle)
    )} ${getButtonTypeClass(button.type ?? this.model.defaultButtonType)} ${labelSize}`;
  }

  getButtonIcon(button: ToolbarButton): string {
    return button.icon !== undefined ? `${button.icon} ${this.model.iconSize}` : '';
  }

  showLabel(button: ToolbarButton): boolean {
    return button.showLabel !== undefined ? button.showLabel : this.config.showButtonLabel;
  }
}
