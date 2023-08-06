import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StaticLookupDataSource } from 'src/app/core/backend/data-source/static-lookup-data-source';
import { ChangeMessageService } from 'src/app/modules/layout/components/shared/services/change-message-service';
import { Sifarnik } from '../../model/sifrarnik';
import { SifrarniciService } from '../../service/sifrarniciService';
import { UIFormlyConfigurationBuilder, UIFormlyConfigurationParams } from 'src/app/modules/layout/components/formly-form';
import { BackendQueryableDataSource } from 'src/app/core';
import { NovaSifraComponent } from '../../components/nova-sifra/nova-sifra.component';

@Component({
  selector: 'app-sifrarnici',
  templateUrl: './sifrarnici.component.html',
  styleUrls: ['./sifrarnici.component.scss'],
  providers: [DialogService, ChangeMessageService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SifrarniciComponent implements OnInit {
  formlyConfiguration!: UIFormlyConfigurationParams;
  public dropdownDataSource!: StaticLookupDataSource<Sifarnik.ISifarnik>;
  public dataSource: StaticLookupDataSource<Sifarnik.ISifarnikLookup>;
  ref: DynamicDialogRef | undefined;
  model: Sifarnik.ISifarnik = {};

  constructor(private sifrarniciService: SifrarniciService, public dialogService: DialogService, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.dropdownDataSource = new StaticLookupDataSource<Sifarnik.ISifarnik>({
      valueField: 'id',
      displayField: 'naziv',
      items: this.sifrarniciService.getSifrarniciDropdownDataLookup(),
    });
    this.dropdownDataSource.load();

    const filterBuilder = new UIFormlyConfigurationBuilder<Sifarnik.ISifarnik>();
    filterBuilder.dropDown('naziv', 'Šifrarnik', (c) =>
      c.dataSource(() => this.dropdownDataSource).onChange(() => this.onChangeSifrarnik(this.model.id))
    );

    this.formlyConfiguration = filterBuilder.getConfiguration();
  }

  onChangeSifrarnik(id: string): void {
    throw new Error('Method not implemented.');
  }

  addNewSifra() {
    this.ref = this.dialogService.open(NovaSifraComponent, {
      modal: true,
      header: 'Unos nove šifre',
      closable: false,
      width: window.innerWidth > 550 ? (this.model.id !== 'poslodavac' ? '18%' : '40%') : '90%',
      data: { sifraId: this.model.id },
    });

    this.ref.onClose.subscribe((sifra: any) => {
      if (sifra) {
        alert(JSON.stringify(sifra));
      }
    });
  }
}
