import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Site,
VisitorSite,
Visitor,
} from '../models';
import {SiteRepository} from '../repositories';

export class SiteVisitorController {
  constructor(
    @repository(SiteRepository) protected siteRepository: SiteRepository,
  ) { }

  @get('/sites/{id}/visitors', {
    responses: {
      '200': {
        description: 'Array of Site has many Visitor through VisitorSite',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Visitor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Visitor>,
  ): Promise<Visitor[]> {
    return this.siteRepository.visitors(id).find(filter);
  }

  @post('/sites/{id}/visitors', {
    responses: {
      '200': {
        description: 'create a Visitor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Visitor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Site.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitor, {
            title: 'NewVisitorInSite',
            exclude: ['id'],
          }),
        },
      },
    }) visitor: Omit<Visitor, 'id'>,
  ): Promise<Visitor> {
    return this.siteRepository.visitors(id).create(visitor);
  }

  @patch('/sites/{id}/visitors', {
    responses: {
      '200': {
        description: 'Site.Visitor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitor, {partial: true}),
        },
      },
    })
    visitor: Partial<Visitor>,
    @param.query.object('where', getWhereSchemaFor(Visitor)) where?: Where<Visitor>,
  ): Promise<Count> {
    return this.siteRepository.visitors(id).patch(visitor, where);
  }

  @del('/sites/{id}/visitors', {
    responses: {
      '200': {
        description: 'Site.Visitor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Visitor)) where?: Where<Visitor>,
  ): Promise<Count> {
    return this.siteRepository.visitors(id).delete(where);
  }
}
