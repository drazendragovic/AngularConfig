import { Injectable } from '@angular/core';
import { BackendRestService } from 'src/app/core/services/rest.service';
import { SindikatiMessageService } from './sindikati-message-service';
import { SindikatiEntityService } from './sindikati-entity-service';
import { BackendRest, StructureInfo } from 'src/app/core';
import { Entity } from 'src/app/core/models/entity/entity';

@Injectable({ providedIn: 'root' })
export class SindikatiBackendRest extends BackendRest {
  constructor(protected override backendRest: BackendRestService, private messageService: SindikatiMessageService) {
    super(backendRest);
  }

  forEntityExt<T extends Entity>(info: StructureInfo<T>): SindikatiEntityService<T> {
    return new SindikatiEntityService(info, this.backendRest, this.messageService);
  }
}
