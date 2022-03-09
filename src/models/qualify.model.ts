import {Entity, model, property, belongsTo} from '@loopback/repository';
import {VisitorSite} from './visitor-site.model';

@model()
export class Qualify extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  stars: number;

  @property({
    type: 'date',
    required: true,
  })
  qualifyDate: string;

  @belongsTo(() => VisitorSite)
  visitorSiteId: number;

  constructor(data?: Partial<Qualify>) {
    super(data);
  }
}

export interface QualifyRelations {
  // describe navigational properties here
}

export type QualifyWithRelations = Qualify & QualifyRelations;
