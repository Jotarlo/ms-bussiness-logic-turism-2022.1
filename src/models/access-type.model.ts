import {Entity, model, property, hasMany} from '@loopback/repository';
import {Site} from './site.model';

@model()
export class AccessType extends Entity {
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

  @hasMany(() => Site)
  sites: Site[];

  constructor(data?: Partial<AccessType>) {
    super(data);
  }
}

export interface AccessTypeRelations {
  // describe navigational properties here
}

export type AccessTypeWithRelations = AccessType & AccessTypeRelations;
