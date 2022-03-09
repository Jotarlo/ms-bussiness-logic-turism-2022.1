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
  City,
  Site,
} from '../models';
import {CityRepository} from '../repositories';

export class CitySiteController {
  constructor(
    @repository(CityRepository) protected cityRepository: CityRepository,
  ) { }

  @get('/cities/{id}/sites', {
    responses: {
      '200': {
        description: 'Array of City has many Site',
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
    return this.cityRepository.sites(id).find(filter);
  }

  @post('/cities/{id}/sites', {
    responses: {
      '200': {
        description: 'City model instance',
        content: {'application/json': {schema: getModelSchemaRef(Site)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof City.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Site, {
            title: 'NewSiteInCity',
            exclude: ['id'],
            optional: ['cityId']
          }),
        },
      },
    }) site: Omit<Site, 'id'>,
  ): Promise<Site> {
    return this.cityRepository.sites(id).create(site);
  }

  @patch('/cities/{id}/sites', {
    responses: {
      '200': {
        description: 'City.Site PATCH success count',
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
    return this.cityRepository.sites(id).patch(site, where);
  }

  @del('/cities/{id}/sites', {
    responses: {
      '200': {
        description: 'City.Site DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Site)) where?: Where<Site>,
  ): Promise<Count> {
    return this.cityRepository.sites(id).delete(where);
  }
}
