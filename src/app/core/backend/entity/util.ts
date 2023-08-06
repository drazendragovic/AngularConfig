import { Optional } from './interfaces';
import { StructureInfo } from '../structure/info';
import { UtilsService } from '../../utils/utils.service';
import { Entity } from '../../models/entity/entity';

export function createEntity<T extends Entity>(info: StructureInfo<T>, data: Optional<T, 'id'>): T {
  return { ...data, id: UtilsService.newGuid() } as T;
}
