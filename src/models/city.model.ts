import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Region} from './region.model';
import {Site} from './site.model';

@model()
export class City extends Entity {
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

  @belongsTo(() => Region)
  regionId: number;

  @hasMany(() => Site)
  sites: Site[];

  constructor(data?: Partial<City>) {
    super(data);
  }
}

export interface CityRelations {
  // describe navigational properties here
}

export type CityWithRelations = City & CityRelations;
