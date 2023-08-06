import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { BackendRest, BackendQueryableDataSource } from 'src/app/core';
import { ChangeMessageService } from 'src/app/modules/layout/components/shared/services/change-message-service';
import { TableConfigurationBuilder } from 'src/app/modules/layout/components/table/configuration/table-configuration';
import { TableConfigurationParams } from 'src/app/modules/layout/components/table/interfaces/tableConfigurationParams';
import { Clan } from 'src/app/shared/models/clan.model';

@Component({
  selector: 'fond-solidarnosti-pretraga-table',
  templateUrl: './fond-solidarnosti-pretraga-table.component.html',
  styleUrls: ['./fond-solidarnosti-pretraga-table.component.scss'],
  providers: [DialogService, ChangeMessageService],
  encapsulation: ViewEncapsulation.None,
})
export class FondSolidarnostiPretragaTableComponent implements OnInit {
  @Input() clanId: string;
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

  public onEdit(row: any): void {}

  public onDelete(row: any): void {
    this.confirmationService.confirm({
      message: 'Želite li obrisati zahtjev za dodjelu sredstva iz sindikalnog Fonda solidarnosti?',
      icon: 'pi pi-exclamation-triangle',
      key: 'zahtjevFondDeleteCancelConfirmation',
      accept: () => this.deleteConfirmed(row),
      reject: (type: ConfirmEventType) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Brisanje zahtjeva',
          detail: 'Odustali ste od brisanja zahtjeva za dodjelu sredstva iz sindikalnog Fonda solidarnosti',
        });
      },
    });
  }

  private deleteConfirmed(row: any): void {
    console.log(row);
  }
}
