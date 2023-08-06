import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendQueryableDataSource, BackendRest } from 'src/app/core';
import { Clan } from 'src/app/shared/models/clan.model';

@Component({
  selector: 'app-clanarine',
  templateUrl: './clanarine.component.html',
  styleUrls: ['./clanarine.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClanarineComponent implements OnInit {
  public clanID: string;
  public dataSource: BackendQueryableDataSource<Clan.IFunkcije>;

  constructor(private backendRest: BackendRest) {}

  ngOnInit() {
    this.dataSource = new BackendQueryableDataSource(Clan.FunkcijeInfo, this.backendRest);
  }
}
