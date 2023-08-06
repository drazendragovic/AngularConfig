import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'clan-podaci-main',
  templateUrl: './clan-podaci-main.component.html',
  styleUrls: ['./clan-podaci-main.component.scss'],
})
export class ClanPodaciMainComponent implements OnInit {
  @Input() clanID;
  @Input() activeindex;

  constructor() {}

  ngOnInit() {}
}
