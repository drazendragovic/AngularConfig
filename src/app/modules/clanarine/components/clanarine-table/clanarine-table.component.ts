import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BackendRest } from 'src/app/core';
import { STableComponent } from 'src/app/modules/layout/components/table/components/s-table/s-table.component';
import { TableConfigurationBuilder } from 'src/app/modules/layout/components/table/configuration/table-configuration';
import { TableConfigurationParams } from 'src/app/modules/layout/components/table/interfaces/tableConfigurationParams';
import { Clan } from 'src/app/shared/models/clan.model';

@Component({
  selector: 'clanarine-table',
  templateUrl: './clanarine-table.component.html',
  styleUrls: ['./clanarine-table.component.scss'],
})
export class ClanarineTableComponent implements OnInit {
  @Input() clanID: string;
  @Input() dataSource;
  @ViewChild(STableComponent) table!: STableComponent;

  public tableConfiguration!: TableConfigurationParams<any>;

  constructor(private backendRest: BackendRest) {}

  ngOnInit() {
    this.buildTable();
  }

  buildTable() {
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
        ($event, row) => this.onDelete(row),
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

  public onDelete(row: any): void {
    console.log(row);
  }
}
