import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fond-solidarnosti-zahtjev-main',
  templateUrl: './fond-solidarnosti-zahtjev-main.component.html',
  styleUrls: ['./fond-solidarnosti-zahtjev-main.component.scss'],
})
export class FondSolidarnostiZahtjevMainComponent implements OnInit {
  @Input() clanID;

  constructor() {}

  ngOnInit() {}
}
