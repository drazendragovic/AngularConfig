import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { BackendRest } from 'src/app/core';
import { ClanPovijestPromjenaComponent } from '../clan-povijest-promjena/clan-povijest-promjena.component';
import { ChangeMessageService } from 'src/app/modules/layout/components/shared/services/change-message-service';
import { ClanEmailFormComponent } from '../clan-email-form/clan-email-form.component';
import { ClanNovaFunkcijaComponent } from '../clan-nova-funkcija/clan-nova-funkcija.component';
import { ClanNoviOdborComponent } from '../clan-novi-odbor/clan-novi-odbor.component';

@Component({
  selector: 'clan-podaci-actions',
  templateUrl: './clan-podaci-actions.component.html',
  styleUrls: ['./clan-podaci-actions.component.scss'],
  providers: [DialogService, ChangeMessageService],
  encapsulation: ViewEncapsulation.None,
})
export class ClanPodaciActionsComponent implements OnInit {
  @Input() activeIndex;
  @Input() clanId;

  constructor(
    private backendRest: BackendRest,
    private dialog: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  deaktivirajClana() {
    this.confirmationService.confirm({
      message: 'Želite li deaktivirati člana?',
      icon: 'pi pi-exclamation-triangle',
      key: 'clanDisableCancelConfirmation',
      accept: () => this.deactivateConfirmed(),
      reject: (type: ConfirmEventType) => {
        this.messageService.add({ severity: 'error', summary: 'Deaktivacija člana', detail: 'Odustali ste od deaktivacije člana' });
      },
    });
  }

  prikaziPovijestPromjena() {
    this.dialog.open(ClanPovijestPromjenaComponent, {
      modal: true,
      header: 'Evidencija povijesti promjena',
      closable: false,
      data: {
        clanId: this.clanId,
      },
      width: window.innerWidth > 600 ? '50%' : '80%',
    });
  }

  posaljiEmail() {
    this.dialog.open(ClanEmailFormComponent, {
      modal: true,
      header: 'Pošalji mail',
      closable: false,
      width: window.innerWidth > 550 ? '30%' : '90%',
      data: {},
    });
  }

  dodajFunkcijuClanu() {
    this.dialog.open(ClanNovaFunkcijaComponent, {
      modal: true,
      header: 'Dodaj funkciju',
      closable: false,
      data: {
        clanId: this.clanId,
      },
      width: window.innerWidth > 600 ? '35%' : '80%',
    });
  }

  dodajOdborClanu() {
    this.dialog.open(ClanNoviOdborComponent, {
      modal: true,
      header: 'Dodaj odbor',
      closable: false,
      data: {
        clanId: this.clanId,
      },
      width: window.innerWidth > 600 ? '20%' : '80%',
    });
  }

  deactivateConfirmed() {}
}
