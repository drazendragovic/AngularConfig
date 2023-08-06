import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { BackendQueryableDataSource, BackendRest } from 'src/app/core';
import { TableConfigurationBuilder } from 'src/app/modules/layout/components/table/configuration/table-configuration';
import { TableConfigurationParams } from 'src/app/modules/layout/components/table/interfaces/tableConfigurationParams';
import { Clan } from 'src/app/shared/models/clan.model';
import { ClanNovaFunkcijaComponent } from '../clan-nova-funkcija/clan-nova-funkcija.component';
import { ChangeMessageService } from 'src/app/modules/layout/components/shared/services/change-message-service';
import { ClanNoviOdborComponent } from '../clan-novi-odbor/clan-novi-odbor.component';

@Component({
  selector: 'clan-odbor-table',
  templateUrl: './clan-odbor-table.component.html',
  styleUrls: ['./clan-odbor-table.component.css'],
  providers: [DialogService, ChangeMessageService],
  encapsulation: ViewEncapsulation.None,
})
export class ClanOdborTableComponent implements OnInit {
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
      .id('OdborTable')
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
    this.dialog.open(ClanNoviOdborComponent, {
      modal: true,
      header: 'Uredi odbor',
      closable: false,
      data: {
        clanId: this.clanId,
      },
      width: window.innerWidth > 600 ? '20%' : '80%',
    });
  }

  public onDelete(row: any): void {
    this.confirmationService.confirm({
      message: 'Želite li obrisati podatke o odboru člana?',
      icon: 'pi pi-exclamation-triangle',
      key: 'clanOdborDeleteCancelConfirmation',
      accept: () => this.deleteConfirmed(row),
      reject: (type: ConfirmEventType) => {
        this.messageService.add({ severity: 'error', summary: 'Brisanje odbora', detail: 'Odustali ste od brisanja odbora člana' });
      },
    });
  }

  private deleteConfirmed(row: any): void {
    console.log(row);
  }
}
