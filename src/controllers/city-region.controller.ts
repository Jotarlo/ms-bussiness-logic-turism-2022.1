import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  City,
  Region,
} from '../models';
import {CityRepository} from '../repositories';

export class CityRegionController {
  constructor(
    @repository(CityRepository)
    public cityRepository: CityRepository,
  ) { }

  @get('/cities/{id}/region', {
    responses: {
      '200': {
        description: 'Region belonging to City',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Region)},
          },
        },
      },
    },
  })
  async getRegion(
    @param.path.number('id') id: typeof City.prototype.id,
  ): Promise<Region> {
    return this.cityRepository.region(id);
  }
}
