import {Entity, model, property} from '@loopback/repository';

@model()
export class AmusementType extends Entity {
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


  constructor(data?: Partial<AmusementType>) {
    super(data);
  }
}

export interface AmusementTypeRelations {
  // describe navigational properties here
}

export type AmusementTypeWithRelations = AmusementType & AmusementTypeRelations;
