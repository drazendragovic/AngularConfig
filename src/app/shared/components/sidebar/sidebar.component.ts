import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() name?: string;
  @Input() key?: string;
  @Input() position: 'left' | 'right';
  @Input() lockedOpen = '';
  @HostBinding('class.locked-open') isLockedOpen?: boolean;
  @Input() foldedWidth: number;
  @Input() foldedAutoTriggerOnHover: boolean;
  @HostBinding('class.unfolded') unfolded?: boolean;
  @Input() invisibleOverlay: boolean;

  @Output() readonly foldedChanged: EventEmitter<boolean>;
  @Output() readonly openedChanged: EventEmitter<boolean>;

  private _folded: boolean;
  private _wasActive?: boolean;
  private _wasFolded?: boolean;
  private _backdrop: HTMLElement | any;
  private _animationPlayer?: AnimationPlayer;

  private _unsubscribeAll: Subject<void>;

  @HostBinding('class.animations-enabled') private _animationsEnabled: boolean;
  @HostBinding('class.opened') private opened: boolean;

  constructor(
    private _animationBuilder: AnimationBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef,
    private _sidebarService: SidebarService,
    private _renderer: Renderer2
  ) {
    this.foldedAutoTriggerOnHover = true;
    this.foldedWidth = 48;
    this.foldedChanged = new EventEmitter();
    this.openedChanged = new EventEmitter();
    this.position = 'left';
    this.invisibleOverlay = false;

    this.opened = true;
    this._animationsEnabled = false;
    this.folded = false;
    this._unsubscribeAll = new Subject();
  }

  @Input()
  set folded(value: boolean) {
    this._folded = value;

    if (!this.opened) {
      return;
    }

    // Programmatically add/remove padding to the element
    // that comes after or before based on the position
    let sibling, styleRule;

    const styleValue = this.foldedWidth + 'px';

    if (this.position === 'left') {
      sibling = this._elementRef.nativeElement.nextElementSibling;
      styleRule = 'padding-left';
    } else {
      sibling = this._elementRef.nativeElement.previousElementSibling;
      styleRule = 'padding-right';
    }

    if (value) {
      this.fold();

      // Set the folded width
      this._renderer.setStyle(this._elementRef.nativeElement, 'width', styleValue);
      this._renderer.setStyle(this._elementRef.nativeElement, 'min-width', styleValue);
      this._renderer.setStyle(this._elementRef.nativeElement, 'max-width', styleValue);

      // Set the style and class
      this._renderer.addClass(this._elementRef.nativeElement, 'folded');
      if (sibling) {
        this._renderer.setStyle(sibling, styleRule, styleValue);
      }
    } else {
      this.unfold();

      // Remove the folded width
      this._renderer.removeStyle(this._elementRef.nativeElement, 'width');
      this._renderer.removeStyle(this._elementRef.nativeElement, 'min-width');
      this._renderer.removeStyle(this._elementRef.nativeElement, 'max-width');

      // Remove the style and class
      this._renderer.removeClass(this._elementRef.nativeElement, 'folded');
      if (sibling) {
        this._renderer.removeStyle(sibling, styleRule);
      }
    }
    this.foldedChanged.emit(this.folded);
  }

  get folded(): boolean {
    return this._folded;
  }

  ngOnInit(): void {
    this.opened = true;
    this._sidebarService.register(this.name, this);
    this._sidebarService.fold(this.name, this._folded);
    this._sidebarService.unfold(this.name, false);
    this._setupVisibility();
    this._setupPosition();
    this._setupLockedOpen();
    this._setupFolded();
  }

  ngOnDestroy(): void {
    if (this.folded) {
      this.unfold();
    }
    this._sidebarService.unregister(this.name);
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  private _setupVisibility(): void {
    this._renderer.setStyle(this._elementRef.nativeElement, 'box-shadow', 'none');
    this._renderer.setStyle(this._elementRef.nativeElement, 'visibility', 'hidden');
  }

  private _setupPosition(): void {
    if (this.position === 'right') {
      this._renderer.addClass(this._elementRef.nativeElement, 'right-positioned');
    } else {
      this._renderer.addClass(this._elementRef.nativeElement, 'left-positioned');
    }
  }

  private _setupLockedOpen(): void {
    if (!this.lockedOpen) {
      return;
    }

    this._wasActive = false;
    this._wasFolded = this.folded;

    this._showSidebar();
  }

  private _setupFolded(): void {
    if (!this.folded) {
      return;
    }

    if (!this.opened) {
      return;
    }

    let sibling, styleRule;

    const styleValue = this.foldedWidth + 'px';

    if (this.position === 'left') {
      sibling = this._elementRef.nativeElement.nextElementSibling;
      styleRule = 'padding-left';
    } else {
      sibling = this._elementRef.nativeElement.previousElementSibling;
      styleRule = 'padding-right';
    }

    this.fold();

    this._renderer.setStyle(this._elementRef.nativeElement, 'width', styleValue);
    this._renderer.setStyle(this._elementRef.nativeElement, 'min-width', styleValue);
    this._renderer.setStyle(this._elementRef.nativeElement, 'max-width', styleValue);

    this._renderer.addClass(this._elementRef.nativeElement, 'folded');

    if (sibling) {
      this._renderer.setStyle(sibling, styleRule, styleValue);
    }
  }

  private _showBackdrop(): void {
    this._backdrop = this._renderer.createElement('div');
    this._backdrop.classList.add('app-sidebar-overlay');

    if (this.invisibleOverlay) {
      this._backdrop.classList.add('app-sidebar-overlay-invisible');
    }

    this._renderer.appendChild(this._elementRef.nativeElement.parentElement, this._backdrop);

    this._animationPlayer = this._animationBuilder.build([animate('300ms ease', style({ opacity: 1 }))]).create(this._backdrop);

    this._animationPlayer.play();

    this._backdrop.addEventListener('click', () => {
      this.close();
    });

    this._changeDetectorRef.markForCheck();
  }

  private _hideBackdrop(): void {
    if (!this._backdrop) {
      return;
    }

    this._animationPlayer = this._animationBuilder.build([animate('300ms ease', style({ opacity: 0 }))]).create(this._backdrop);

    this._animationPlayer.play();
    this._animationPlayer.onDone(() => {
      if (this._backdrop) {
        this._backdrop.parentNode.removeChild(this._backdrop);
        this._backdrop = null;
      }
    });
    this._changeDetectorRef.markForCheck();
  }

  private _showSidebar(): void {
    this._renderer.removeStyle(this._elementRef.nativeElement, 'box-shadow');
    this._renderer.removeStyle(this._elementRef.nativeElement, 'visibility');
    this._changeDetectorRef.markForCheck();
  }

  private _hideSidebar(delay = true): void {
    const delayAmount = delay ? 300 : 0;

    setTimeout(() => {
      this._renderer.setStyle(this._elementRef.nativeElement, 'box-shadow', 'none');
      this._renderer.setStyle(this._elementRef.nativeElement, 'visibility', 'hidden');
    }, delayAmount);

    this._changeDetectorRef.markForCheck();
  }

  private _enableAnimations(): void {
    if (this._animationsEnabled) {
      return;
    }
    this._animationsEnabled = true;
    this._changeDetectorRef.markForCheck();
  }

  open(): void {
    if (this.opened || this.isLockedOpen) {
      return;
    }
    this._enableAnimations();
    this._showSidebar();
    this._showBackdrop();

    this.opened = true;
    this.openedChanged.emit(this.opened);
    this._changeDetectorRef.markForCheck();
  }

  close(): void {
    if (!this.opened || this.isLockedOpen) {
      return;
    }
    this._enableAnimations();
    this._hideBackdrop();
    this.opened = false;
    this.openedChanged.emit(this.opened);
    this._hideSidebar();
    this._changeDetectorRef.markForCheck();
  }

  toggleSidebarOpen(): void {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    // Only work if the auto trigger is enabled
    if (!this.foldedAutoTriggerOnHover) {
      return;
    }
    this.unfoldTemporarily();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    // Only work if the auto trigger is enabled
    if (!this.foldedAutoTriggerOnHover) {
      return;
    }
    this.foldTemporarily();
  }

  fold(): void {
    // Only work if the sidebar is not folded
    if (this.folded) {
      return;
    }
    this._enableAnimations();
    this.folded = true;
    this._sidebarService.fold(this.name, this._folded);

    this._changeDetectorRef.markForCheck();
  }

  unfold(): void {
    // Only work if the sidebar is folded
    if (!this.folded) {
      return;
    }
    this._enableAnimations();
    this.folded = false;
    this._sidebarService.fold(this.name, this._folded);

    this._changeDetectorRef.markForCheck();
  }

  toggleSidebarFold(): void {
    if (this.folded) {
      this.unfold();
    } else {
      this.fold();
    }
  }

  foldTemporarily(): void {
    // Only work if the sidebar is folded
    if (!this.folded) {
      return;
    }
    this._enableAnimations();
    this.unfolded = false;
    const styleValue = this.foldedWidth + 'px';
    this._sidebarService.unfold(this.name, false);

    this._renderer.setStyle(this._elementRef.nativeElement, 'width', styleValue);
    this._renderer.setStyle(this._elementRef.nativeElement, 'min-width', styleValue);
    this._renderer.setStyle(this._elementRef.nativeElement, 'max-width', styleValue);

    this._changeDetectorRef.markForCheck();
  }

  unfoldTemporarily(): void {
    // Only work if the sidebar is folded
    if (!this.folded) {
      return;
    }
    this._enableAnimations();
    this.unfolded = true;
    this._sidebarService.unfold(this.name, true);

    this._renderer.removeStyle(this._elementRef.nativeElement, 'width');
    this._renderer.removeStyle(this._elementRef.nativeElement, 'min-width');
    this._renderer.removeStyle(this._elementRef.nativeElement, 'max-width');
    this._renderer.setStyle(this._elementRef.nativeElement, 'position', 'relative');

    this._changeDetectorRef.markForCheck();
  }
}
