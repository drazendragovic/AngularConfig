import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendQueryableDataSource, BackendRest } from 'src/app/core';
import { TableConfigurationBuilder } from 'src/app/modules/layout/components/table/configuration/table-configuration';
import { TableConfigurationParams } from 'src/app/modules/layout/components/table/interfaces/tableConfigurationParams';
import { Clan } from 'src/app/shared/models/clan.model';

@Component({
  selector: 'clan-funkcije-main',
  templateUrl: './clan-funkcije-main.component.html',
  styleUrls: ['./clan-funkcije-main.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClanFunkcijeMainComponent implements OnInit {
  @Input() clanID;
  @Input() activeindex;

  constructor() {}

  ngOnInit() {}
}
