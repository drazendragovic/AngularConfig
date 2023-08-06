import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NoviClanComponent } from '../../components/pretraga/novi-clan/novi-clan.component';
import { take } from 'rxjs';
import { BackendQueryableDataSource, BackendRest } from 'src/app/core';
import { Clan } from 'src/app/shared/models/clan.model';
import { ChangeMessageService } from 'src/app/modules/layout/components/shared/services/change-message-service';
import { ClanPretragaTableComponent } from '../../components/pretraga/clan-pretraga-table/clan-pretraga-table.component';

@Component({
  selector: 'app-clan-pretraga',
  templateUrl: './clan-pretraga.component.html',
  styleUrls: ['./clan-pretraga.component.scss'],
  providers: [DialogService, ChangeMessageService],
  encapsulation: ViewEncapsulation.None,
})
export class ClanPretragaComponent implements OnInit, OnDestroy {
  public clanID: string;
  public dataSource: BackendQueryableDataSource<Clan.IFunkcije>;
  ref: DynamicDialogRef | undefined;
  @ViewChild(ClanPretragaTableComponent) public table!: ClanPretragaTableComponent;

  constructor(public dialogService: DialogService, private backendRest: BackendRest) {}

  ngOnInit(): void {
    this.dataSource = new BackendQueryableDataSource(Clan.FunkcijeInfo, this.backendRest);
  }

  addNewClan(): void {
    this.ref = this.dialogService.open(NoviClanComponent, {
      modal: true,
      header: 'Unos novog člana',
      closable: false,
      width: window.innerWidth > 550 ? '54%' : '90%',
      data: {},
    });

    this.ref.onClose.subscribe((clan: any) => {
      if (clan) {
        alert(JSON.stringify(clan));
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
