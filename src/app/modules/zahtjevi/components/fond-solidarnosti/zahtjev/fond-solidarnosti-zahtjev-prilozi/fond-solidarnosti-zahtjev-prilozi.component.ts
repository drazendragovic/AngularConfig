import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { BackendRest, BackendQueryableDataSource } from 'src/app/core';
import { ChangeMessageService } from 'src/app/modules/layout/components/shared/services/change-message-service';
import { TableConfigurationBuilder } from 'src/app/modules/layout/components/table/configuration/table-configuration';
import { TableConfigurationParams } from 'src/app/modules/layout/components/table/interfaces/tableConfigurationParams';
import { Clan } from 'src/app/shared/models/clan.model';

@Component({
  selector: 'fond-solidarnosti-zahtjev-prilozi',
  templateUrl: './fond-solidarnosti-zahtjev-prilozi.component.html',
  styleUrls: ['./fond-solidarnosti-zahtjev-prilozi.component.scss'],
  providers: [DialogService, ChangeMessageService],
  encapsulation: ViewEncapsulation.None,
})
export class FondSolidarnostiZahtjevPriloziComponent implements OnInit {
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
    //this.dataSource = new BackendQueryableDataSource(Clan.FunkcijeInfo, this.backendRest);
    this.buildTable();
  }

  buildTable() {
    const tableBuilder = new TableConfigurationBuilder<Clan.IFunkcije>();
    tableBuilder
      .id('PrilogTable')
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
      message: 'Želite li obrisati prilog zahtjeva?',
      icon: 'pi pi-exclamation-triangle',
      key: 'prilogDeleteCancelConfirmation',
      accept: () => this.deleteConfirmed(row),
      reject: (type: ConfirmEventType) => {
        this.messageService.add({ severity: 'error', summary: 'Brisanje priloga', detail: 'Odustali ste od brisanja priloga' });
      },
    });
  }

  private deleteConfirmed(row: any): void {
    console.log(row);
  }
}
