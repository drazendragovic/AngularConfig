import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendRestService } from 'src/app/core/services/rest.service';
import { IBaseModel } from '../../shared/models/base-model/i-base-model';
import { map } from 'rxjs';
import { IBaseResponse } from 'src/app/core/models/backend/iBaseResponse';

export interface IFunkcije {
  list: Funkcije[];
}

export interface Funkcije {
  id: string;
  naziv: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  constructor(protected backendService: BackendRestService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.backendService
      .request<IBaseResponse<Funkcije>>('Sifarnik/Funkcije', 'GET')
      .pipe(map((x) => x?.data.list))
      .subscribe((x) => console.log(x));
  }
}
