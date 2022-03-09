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
  AccessType,
  Site,
} from '../models';
import {AccessTypeRepository} from '../repositories';

export class AccessTypeSiteController {
  constructor(
    @repository(AccessTypeRepository) protected accessTypeRepository: AccessTypeRepository,
  ) { }

  @get('/access-types/{id}/sites', {
    responses: {
      '200': {
        description: 'Array of AccessType has many Site',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Site)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Site>,
  ): Promise<Site[]> {
    return this.accessTypeRepository.sites(id).find(filter);
  }

  @post('/access-types/{id}/sites', {
    responses: {
      '200': {
        description: 'AccessType model instance',
        content: {'application/json': {schema: getModelSchemaRef(Site)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof AccessType.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Site, {
            title: 'NewSiteInAccessType',
            exclude: ['id'],
            optional: ['accessTypeId']
          }),
        },
      },
    }) site: Omit<Site, 'id'>,
  ): Promise<Site> {
    return this.accessTypeRepository.sites(id).create(site);
  }

  @patch('/access-types/{id}/sites', {
    responses: {
      '200': {
        description: 'AccessType.Site PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Site, {partial: true}),
        },
      },
    })
    site: Partial<Site>,
    @param.query.object('where', getWhereSchemaFor(Site)) where?: Where<Site>,
  ): Promise<Count> {
    return this.accessTypeRepository.sites(id).patch(site, where);
  }

  @del('/access-types/{id}/sites', {
    responses: {
      '200': {
        description: 'AccessType.Site DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Site)) where?: Where<Site>,
  ): Promise<Count> {
    return this.accessTypeRepository.sites(id).delete(where);
  }
}
