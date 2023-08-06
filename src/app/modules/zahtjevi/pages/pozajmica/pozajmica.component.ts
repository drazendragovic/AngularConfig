import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-pozajmica',
  templateUrl: './pozajmica.component.html',
  styleUrls: ['./pozajmica.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PozajmicaComponent implements OnInit {
  statusLabel = 'AKTIVAN';
  regLabel = '0123';
  labelsIcon = faNewspaper;
  constructor() {}

  ngOnInit() {}
}
