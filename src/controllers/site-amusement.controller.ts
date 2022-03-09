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
  Amusement,
} from '../models';
import {SiteRepository} from '../repositories';

export class SiteAmusementController {
  constructor(
    @repository(SiteRepository) protected siteRepository: SiteRepository,
  ) { }

  @get('/sites/{id}/amusements', {
    responses: {
      '200': {
        description: 'Array of Site has many Amusement',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Amusement)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Amusement>,
  ): Promise<Amusement[]> {
    return this.siteRepository.amusements(id).find(filter);
  }

  @post('/sites/{id}/amusements', {
    responses: {
      '200': {
        description: 'Site model instance',
        content: {'application/json': {schema: getModelSchemaRef(Amusement)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Site.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Amusement, {
            title: 'NewAmusementInSite',
            exclude: ['id'],
            optional: ['siteId']
          }),
        },
      },
    }) amusement: Omit<Amusement, 'id'>,
  ): Promise<Amusement> {
    return this.siteRepository.amusements(id).create(amusement);
  }

  @patch('/sites/{id}/amusements', {
    responses: {
      '200': {
        description: 'Site.Amusement PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Amusement, {partial: true}),
        },
      },
    })
    amusement: Partial<Amusement>,
    @param.query.object('where', getWhereSchemaFor(Amusement)) where?: Where<Amusement>,
  ): Promise<Count> {
    return this.siteRepository.amusements(id).patch(amusement, where);
  }

  @del('/sites/{id}/amusements', {
    responses: {
      '200': {
        description: 'Site.Amusement DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Amusement)) where?: Where<Amusement>,
  ): Promise<Count> {
    return this.siteRepository.amusements(id).delete(where);
  }
}
