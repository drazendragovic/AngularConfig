import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BackendQueryableDataSource, BackendRest } from 'src/app/core';
import { ChangeMessageService } from 'src/app/modules/layout/components/shared/services/change-message-service';
import { TableConfigurationBuilder } from 'src/app/modules/layout/components/table/configuration/table-configuration';
import { TableConfigurationParams } from 'src/app/modules/layout/components/table/interfaces/tableConfigurationParams';
import { Clan } from 'src/app/shared/models/clan.model';
import { NovaUplataClanarineComponent } from '../nova-uplata-clanarine/nova-uplata-clanarine.component';

@Component({
  selector: 'clan-podaci-evidencija-uplata',
  templateUrl: './clan-podaci-evidencija-uplata.component.html',
  styleUrls: ['./clan-podaci-evidencija-uplata.component.scss'],
  providers: [DialogService, ChangeMessageService],
  encapsulation: ViewEncapsulation.None,
})
export class ClanPodaciEvidencijaUplataComponent implements OnInit {
  @Input() clanId: string;
  ref: DynamicDialogRef | undefined;
  dataSource: any;

  public tableConfiguration!: TableConfigurationParams<any>;

  constructor(
    private dialog: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private backendRest: BackendRest
  ) {}

  ngOnInit() {
    this.dataSource = new BackendQueryableDataSource(Clan.FunkcijeInfo, this.backendRest);
    this.buildTable();
  }

  buildTable() {
    const tableBuilder = new TableConfigurationBuilder<Clan.IFunkcije>();
    tableBuilder
      .id('Funkcije')
      .dataSource(this.dataSource)
      .rowActionWidth(2)
      .addColumn('ID', 'id')
      .addColumn('Naziv', 'naziv')
      .addAction(
        'Obriši',
        'pi pi-trash',
        ($event, row) => this.onDelete(row),
        (c) => c.style('text').position('right').type('danger')
      );

    this.tableConfiguration = tableBuilder.getConfiguration();
  }

  public onDelete(row: any): void {
    this.confirmationService.confirm({
      message: 'Želite li obrisati podatke o uplati članarine?',
      icon: 'pi pi-exclamation-triangle',
      key: 'clanEvidencijaUplateDeleteCancelConfirmation',
      accept: () => this.deleteConfirmed(row),
      reject: (type: ConfirmEventType) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Brisanje evidencije uplate',
          detail: 'Odustali ste od brisanja uplate članarine',
        });
      },
    });
  }

  private deleteConfirmed(row: any): void {
    console.log(row);
  }

  dodajUplatu() {
    this.ref = this.dialog.open(NovaUplataClanarineComponent, {
      modal: true,
      header: 'Unos uplate članarine',
      closable: false,
      width: window.innerWidth > 550 ? '20%' : '90%',
      data: {},
    });

    this.ref.onClose.subscribe((clan: any) => {
      if (clan) {
        alert(JSON.stringify(clan));
      }
    });
  }

  oslobodiClanarine() {}
}
