import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fond-solidarnosti-pretraga-main',
  templateUrl: './fond-solidarnosti-pretraga-main.component.html',
  styleUrls: ['./fond-solidarnosti-pretraga-main.component.scss'],
})
export class FondSolidarnostiPretragaMainComponent implements OnInit {
  @Input() clanID;

  constructor() {}

  ngOnInit() {}
}
