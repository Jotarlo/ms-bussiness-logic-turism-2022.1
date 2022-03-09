import {Entity, hasMany, model, property} from '@loopback/repository';
import {Site} from './site.model';
import {VisitorSite} from './visitor-site.model';

@model()
export class Visitor extends Entity {
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
  phone: string;


  @property({
    type: 'string',
    required: true,
    default: ""
  })
  email: string;

  @hasMany(() => Site, {through: {model: () => VisitorSite}})
  sites: Site[];

  constructor(data?: Partial<Visitor>) {
    super(data);
  }
}

export interface VisitorRelations {
  // describe navigational properties here
}

export type VisitorWithRelations = Visitor & VisitorRelations;
