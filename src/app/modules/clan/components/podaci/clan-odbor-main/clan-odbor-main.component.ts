import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'clan-odbor-main',
  templateUrl: './clan-odbor-main.component.html',
  styleUrls: ['./clan-odbor-main.component.scss'],
})
export class ClanOdborMainComponent implements OnInit {
  @Input() clanID;
  @Input() activeindex;

  constructor() {}

  ngOnInit() {}
}
