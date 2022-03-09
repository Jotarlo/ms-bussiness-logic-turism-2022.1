import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {AccessType} from './access-type.model';
import {Amusement} from './amusement.model';
import {City} from './city.model';
import {VisitorSite} from './visitor-site.model';
import {Visitor} from './visitor.model';

@model({
  settings: {
    foreignKeys: {
      fk_site_access_type: {
        name: 'fk_site_access_type',
        entity: 'AccessType',
        entityKey: 'id',
        foreignKey: 'accessTypeId',
      },
      fk_site_city: {
        name: 'fk_site_city',
        entity: 'City',
        entityKey: 'id',
        foreignKey: 'cityId',
      }
    },
  },
})
export class Site extends Entity {
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
    required: true,
  })
  description: string;

  @property({
    type: 'string',
  })
  longitude?: string;

  @property({
    type: 'string',
  })
  latitude?: string;

  @property({
    type: 'number',
    required: true,
  })
  stars: number;

  @belongsTo(() => AccessType)
  accessTypeId: number;

  @belongsTo(() => City)
  cityId: number;

  @hasMany(() => Amusement)
  amusements: Amusement[];

  @hasMany(() => Visitor, {through: {model: () => VisitorSite}})
  visitors: Visitor[];

  constructor(data?: Partial<Site>) {
    super(data);
  }
}

export interface SiteRelations {
  // describe navigational properties here
}

export type SiteWithRelations = Site & SiteRelations;
