import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BackendRest } from 'src/app/core';
import { ChangeMessageService } from 'src/app/modules/layout/components/shared/services/change-message-service';
import { STableComponent } from 'src/app/modules/layout/components/table/components/s-table/s-table.component';
import { TableConfigurationBuilder } from 'src/app/modules/layout/components/table/configuration/table-configuration';
import { TableConfigurationParams } from 'src/app/modules/layout/components/table/interfaces/tableConfigurationParams';

export interface SifrarnikTable {
  id: string;
  naziv?: string;
  datum?: Date;
  aktivan: boolean;
  datumpromjene?: Date;
}

@Component({
  selector: 'sifrarnik-table',
  templateUrl: './sifrarnik-table.component.html',
  styleUrls: ['./sifrarnik-table.component.scss'],
  providers: [DialogService, ChangeMessageService],
  encapsulation: ViewEncapsulation.None,
})
export class SifrarnikTableComponent implements OnInit, OnDestroy {
  @Input() sifraID;
  @Input() dataSource;
  ref: DynamicDialogRef | undefined;
  @ViewChild(STableComponent) table!: STableComponent;

  public tableConfiguration!: TableConfigurationParams<any>;

  constructor(
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private backendRest: BackendRest
  ) {}

  ngOnInit() {
    this.createtable();
  }

  createtable() {
    const tableBuilder = new TableConfigurationBuilder<SifrarnikTable>();
    tableBuilder
      .id('Funkcije')
      .dataSource(this.dataSource)
      .rowActionWidth(2)
      .addColumn('ID', 'id')
      .addColumn('Naziv', 'naziv')
      .addColumn('Datum unosa', 'datum')
      .addColumn('Aktivan', 'aktivan')
      .addColumn('Datum promjene', 'datumpromjene')
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
    console.log(row);
  }

  public onDelete(row: any): void {
    this.confirmationService.confirm({
      message: 'Želite li obrisati podatke o članu?',
      icon: 'pi pi-exclamation-triangle',
      key: 'clanDeleteCancelConfirmation',
      accept: () => this.deleteConfirmed(row),
      reject: (type: ConfirmEventType) => {
        this.messageService.add({ severity: 'error', summary: 'Brisanje člana', detail: 'Odustali ste od brisanja podataka o članu' });
      },
    });
  }

  private deleteConfirmed(row: any): void {
    console.log(row);
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
