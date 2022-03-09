import {Entity, model, property, hasOne} from '@loopback/repository';
import {Comment} from './comment.model';
import {Qualify} from './qualify.model';

@model()
export class VisitorSite extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  visitDate: string;

  @property({
    type: 'number',
  })
  siteId?: number;

  @property({
    type: 'number',
  })
  visitorId?: number;

  @hasOne(() => Comment)
  comment: Comment;

  @hasOne(() => Qualify)
  qualify: Qualify;

  constructor(data?: Partial<VisitorSite>) {
    super(data);
  }
}

export interface VisitorSiteRelations {
  // describe navigational properties here
}

export type VisitorSiteWithRelations = VisitorSite & VisitorSiteRelations;
