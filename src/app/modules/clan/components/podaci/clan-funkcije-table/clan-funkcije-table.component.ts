import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { BackendQueryableDataSource, BackendRest } from 'src/app/core';
import { ChangeMessageService } from 'src/app/modules/layout/components/shared/services/change-message-service';
import { TableConfigurationBuilder } from 'src/app/modules/layout/components/table/configuration/table-configuration';
import { TableConfigurationParams } from 'src/app/modules/layout/components/table/interfaces/tableConfigurationParams';
import { Clan } from 'src/app/shared/models/clan.model';
import { ClanNovaFunkcijaComponent } from '../clan-nova-funkcija/clan-nova-funkcija.component';

@Component({
  selector: 'clan-funkcije-table',
  templateUrl: './clan-funkcije-table.component.html',
  styleUrls: ['./clan-funkcije-table.component.scss'],
  providers: [DialogService, ChangeMessageService],
  encapsulation: ViewEncapsulation.None,
})
export class ClanFunkcijeTableComponent implements OnInit {
  @Input() clanId;
  dataSource: any;

  public tableConfiguration!: TableConfigurationParams<any>;

  constructor(
    public dialog: DialogService,
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
      .id('FunkcijeTable')
      .dataSource(this.dataSource)
      .rowActionWidth(2)
      .addColumn('ID', 'id')
      .addColumn('Naziv', 'naziv')
      .addAction(
        'Uredi',
        'pi pi-pencil',
        ($event, row) => this.onEdit(row),
        (c) => c.style('text').position('right').type('secondary')
      )
      .addAction(
        'Obriši',
        'pi pi-trash',
        ($event, row) => this.onDelete(row),
        (c) => c.style('text').position('right').type('danger')
      );

    this.tableConfiguration = tableBuilder.getConfiguration();
  }

  public onEdit(row: any): void {
    this.dialog.open(ClanNovaFunkcijaComponent, {
      modal: true,
      header: 'Uredi funkciju',
      closable: false,
      data: {
        clanId: this.clanId,
      },
      width: window.innerWidth > 600 ? '35%' : '80%',
    });
  }

  public onDelete(row: any): void {
    this.confirmationService.confirm({
      message: 'Želite li obrisati podatke o funkciji člana?',
      icon: 'pi pi-exclamation-triangle',
      key: 'clanFunkcijaDeleteCancelConfirmation',
      accept: () => this.deleteConfirmed(row),
      reject: (type: ConfirmEventType) => {
        this.messageService.add({ severity: 'error', summary: 'Brisanje funkcije', detail: 'Odustali ste od brisanja funkcije člana' });
      },
    });
  }

  private deleteConfirmed(row: any): void {
    console.log(row);
  }
}
