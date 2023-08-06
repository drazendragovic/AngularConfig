import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  OnInit,
  Optional,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChangeMessageService } from '../../../shared/services/change-message-service';
import { UITabsConfigurationParams } from '../../interfaces/uITabsConfigurationParams';

@Component({
  selector: 's-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ui-tabs.component.html',
  styleUrls: ['./ui-tabs.component.scss'],
})
export class UITabsComponent implements OnInit, AfterViewInit, OnDestroy {
  _activeIndex = 0;
  cache = true;

  @Input() configuration!: UITabsConfigurationParams;
  @Output() public readonly indexChanged = new EventEmitter<number>();
  private destroy$$ = new Subject<void>();

  public get activeIndex(): number {
    return this._activeIndex;
  }

  public set activeIndex(val: number) {
    this._activeIndex = val;
    this.onIndexChange(val);
    this.indexChanged.emit(this._activeIndex);
  }

  constructor(private cdRef: ChangeDetectorRef, @Optional() private changeMessageService: ChangeMessageService) {}

  ngOnInit(): void {
    this.activeIndex = this.configuration.initialTabIndex;
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
    if (this.changeMessageService) {
      this.changeMessageService.tableSelectionChanged.pipe(takeUntil(this.destroy$$)).subscribe(() => this.cdRef.detectChanges());
    }
  }

  public onTabChange(e: any): void {
    this.activeIndex = e.index;
  }

  private onIndexChange(index: number): void {
    const tab = this.configuration?.tabs[index];
    if (tab?.onFocusFn && tab?.componentInstance) {
      tab.onFocusFn(tab?.componentInstance, null);
    }
    this.cdRef.detectChanges();
  }
}
