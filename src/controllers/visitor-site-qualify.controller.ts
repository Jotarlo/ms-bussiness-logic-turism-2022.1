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
  VisitorSite,
  Qualify,
} from '../models';
import {VisitorSiteRepository} from '../repositories';

export class VisitorSiteQualifyController {
  constructor(
    @repository(VisitorSiteRepository) protected visitorSiteRepository: VisitorSiteRepository,
  ) { }

  @get('/visitor-sites/{id}/qualify', {
    responses: {
      '200': {
        description: 'VisitorSite has one Qualify',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Qualify),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Qualify>,
  ): Promise<Qualify> {
    return this.visitorSiteRepository.qualify(id).get(filter);
  }

  @post('/visitor-sites/{id}/qualify', {
    responses: {
      '200': {
        description: 'VisitorSite model instance',
        content: {'application/json': {schema: getModelSchemaRef(Qualify)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof VisitorSite.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Qualify, {
            title: 'NewQualifyInVisitorSite',
            exclude: ['id'],
            optional: ['visitorSiteId']
          }),
        },
      },
    }) qualify: Omit<Qualify, 'id'>,
  ): Promise<Qualify> {
    return this.visitorSiteRepository.qualify(id).create(qualify);
  }

  @patch('/visitor-sites/{id}/qualify', {
    responses: {
      '200': {
        description: 'VisitorSite.Qualify PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Qualify, {partial: true}),
        },
      },
    })
    qualify: Partial<Qualify>,
    @param.query.object('where', getWhereSchemaFor(Qualify)) where?: Where<Qualify>,
  ): Promise<Count> {
    return this.visitorSiteRepository.qualify(id).patch(qualify, where);
  }

  @del('/visitor-sites/{id}/qualify', {
    responses: {
      '200': {
        description: 'VisitorSite.Qualify DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Qualify)) where?: Where<Qualify>,
  ): Promise<Count> {
    return this.visitorSiteRepository.qualify(id).delete(where);
  }
}
