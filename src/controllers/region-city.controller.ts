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
  Region,
  City,
} from '../models';
import {RegionRepository} from '../repositories';

export class RegionCityController {
  constructor(
    @repository(RegionRepository) protected regionRepository: RegionRepository,
  ) { }

  @get('/regions/{id}/cities', {
    responses: {
      '200': {
        description: 'Array of Region has many City',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(City)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<City>,
  ): Promise<City[]> {
    return this.regionRepository.has_cities(id).find(filter);
  }

  @post('/regions/{id}/cities', {
    responses: {
      '200': {
        description: 'Region model instance',
        content: {'application/json': {schema: getModelSchemaRef(City)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Region.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(City, {
            title: 'NewCityInRegion',
            exclude: ['id'],
            optional: ['regionId']
          }),
        },
      },
    }) city: Omit<City, 'id'>,
  ): Promise<City> {
    return this.regionRepository.has_cities(id).create(city);
  }

  @patch('/regions/{id}/cities', {
    responses: {
      '200': {
        description: 'Region.City PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(City, {partial: true}),
        },
      },
    })
    city: Partial<City>,
    @param.query.object('where', getWhereSchemaFor(City)) where?: Where<City>,
  ): Promise<Count> {
    return this.regionRepository.has_cities(id).patch(city, where);
  }

  @del('/regions/{id}/cities', {
    responses: {
      '200': {
        description: 'Region.City DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(City)) where?: Where<City>,
  ): Promise<Count> {
    return this.regionRepository.has_cities(id).delete(where);
  }
}
