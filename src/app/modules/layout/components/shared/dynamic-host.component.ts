/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/component-selector */
import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { SafeAny } from 'src/app/core';

export interface ComponentInfo {
  component: Type<SafeAny>;
  componentInstance?: Component;
  initFn?: (instance: SafeAny, data: SafeAny) => void;
  onFocusFn?: (instance: SafeAny, data: SafeAny) => void;
}

@Directive({
  selector: '[adHost]',
})
export class AdDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  selector: 'f-dynamic-host',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-container adHost></ng-container>`,
})
export class DynamicHostComponent implements OnDestroy, OnInit {
  @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;

  @Input() componentInfo!: ComponentInfo;
  @Input() data: SafeAny;
  cmpRef!: ComponentRef<Component>;
  private isViewInitialized = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  updateComponent(): void {
    if (!this.isViewInitialized) {
      return;
    }
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }

    const factory = this.componentFactoryResolver.resolveComponentFactory(this.componentInfo.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    this.cmpRef = viewContainerRef.createComponent(factory);

    this.componentInfo.componentInstance = this.cmpRef.instance;

    if (this.componentInfo.initFn) {
      this.componentInfo.initFn(this.cmpRef.instance, this.data);
    }
  }

  ngOnDestroy(): void {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }

  ngOnInit(): void {
    this.isViewInitialized = true;
    this.updateComponent();
  }
}
