import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Amusement} from './amusement.model';

@model()
export class AmusementImage extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  path?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  tags?: string[];

  @belongsTo(() => Amusement)
  amusementId: number;

  constructor(data?: Partial<AmusementImage>) {
    super(data);
  }
}

export interface AmusementImageRelations {
  // describe navigational properties here
}

export type AmusementImageWithRelations = AmusementImage & AmusementImageRelations;
