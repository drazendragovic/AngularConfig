/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { BackendRest, DataSource } from 'src/app/core';
import { ChangeMessageService } from 'src/app/modules/layout/components/shared/services/change-message-service';
import { STableComponent } from 'src/app/modules/layout/components/table/components/s-table/s-table.component';
import { TableConfigurationBuilder } from 'src/app/modules/layout/components/table/configuration/table-configuration';
import { TableConfigurationParams } from 'src/app/modules/layout/components/table/interfaces/tableConfigurationParams';
import { Clan } from 'src/app/shared/models/clan.model';
import { ClanEmailFormComponent } from '../../podaci/clan-email-form/clan-email-form.component';

export interface Clantable {
  RegBroj?: string;
  Ime?: string;
  Prezime?: string;
  Podruznica?: string;
  Zupanija?: string;
  Poslodavac?: string;
  TijeloSindikata?: string;
}

@Component({
  selector: 'clan-pretraga-table',
  templateUrl: './clan-pretraga-table.component.html',
  styleUrls: ['./clan-pretraga-table.component.scss'],
  providers: [DialogService, ChangeMessageService],
})
export class ClanPretragaTableComponent implements OnInit, OnDestroy {
  @Input() clanID: string;
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
    const tableBuilder = new TableConfigurationBuilder<Clan.IFunkcije>();
    tableBuilder
      .id('Funkcije')
      .dataSource(this.dataSource)
      .rowActionWidth(2)
      .selectionType('checkbox')
      .addColumn('ID', 'id')
      .addColumn('Naziv', 'naziv')
      .addAction(
        'Uredi',
        'pi pi-pencil',
        ($event, row) => this.onEdit(row),
        (c) => c.style('text').position('right').type('secondary')
      )
      .addAction(
        'Mail',
        'pi pi-send',
        ($event, row) => this.onEmail(row),
        (c) => c.style('text').position('right').type('primary')
      )
      .addAction(
        'Obriši',
        'pi pi-trash',
        ($event, row) => this.onDelete(row),
        (c) => c.style('text').position('right').type('danger')
      );

    this.tableConfiguration = tableBuilder.getConfiguration();
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  public onEdit(row: any): void {
    console.log(row);
  }

  public onEmail(row: any): void {
    this.ref = this.dialogService.open(ClanEmailFormComponent, {
      modal: true,
      header: 'Pošalji mail',
      closable: false,
      width: window.innerWidth > 550 ? '30%' : '90%',
      data: {},
    });

    this.ref.onClose.subscribe((clan: any) => {
      if (clan) {
        alert(JSON.stringify(clan));
      }
    });
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
}
