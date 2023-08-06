import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { BackendQueryableDataSource, BackendRest } from 'src/app/core';
import { TableConfigurationBuilder } from 'src/app/modules/layout/components/table/configuration/table-configuration';
import { TableConfigurationParams } from 'src/app/modules/layout/components/table/interfaces/tableConfigurationParams';
import { Clan } from 'src/app/shared/models/clan.model';

@Component({
  selector: 'clan-povijest-promjena',
  templateUrl: './clan-povijest-promjena.component.html',
  styleUrls: ['./clan-povijest-promjena.component.scss'],
})
export class ClanPovijestPromjenaComponent implements OnInit {
  @Input() clanId;
  dataSource: any;

  public tableConfiguration!: TableConfigurationParams<any>;

  constructor(public ref: DynamicDialogRef, private backendRest: BackendRest) {}

  ngOnInit() {
    this.dataSource = new BackendQueryableDataSource(Clan.FunkcijeInfo, this.backendRest);
    this.buildTable();
  }

  buildTable() {
    const tableBuilder = new TableConfigurationBuilder<Clan.IFunkcije>();
    tableBuilder.id('OdborTable').dataSource(this.dataSource).rowActionWidth(2).addColumn('ID', 'id').addColumn('Naziv', 'naziv');

    this.tableConfiguration = tableBuilder.getConfiguration();
  }
}
