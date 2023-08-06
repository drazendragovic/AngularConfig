import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class SindikatiMessageService {
  constructor(private messageService: MessageService) {}

  showSuccessMessage(clearMessages = true, saveMessage?: Message): void {
    if (clearMessages) {
      this.messageService.clear();
    }
    this.messageService.add(
      saveMessage ??
        ({
          severity: 'success',
          summary: 'Spremanje',
          detail: saveMessage ?? 'Uspješno spremljeno',
        } as Message)
    );
  }

  showDeleteMessage(clearMessages = true, deleteMessage?: Message): void {
    if (clearMessages) {
      this.messageService.clear();
    }
    this.messageService.add(
      deleteMessage ??
        ({
          severity: 'success',
          summary: 'Brisanje',
          detail: deleteMessage ?? 'Uspješno obrisano',
        } as Message)
    );
  }
}
