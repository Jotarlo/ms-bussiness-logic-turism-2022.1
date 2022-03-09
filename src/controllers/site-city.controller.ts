import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Site,
  City,
} from '../models';
import {SiteRepository} from '../repositories';

export class SiteCityController {
  constructor(
    @repository(SiteRepository)
    public siteRepository: SiteRepository,
  ) { }

  @get('/sites/{id}/city', {
    responses: {
      '200': {
        description: 'City belonging to Site',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(City)},
          },
        },
      },
    },
  })
  async getCity(
    @param.path.number('id') id: typeof Site.prototype.id,
  ): Promise<City> {
    return this.siteRepository.city(id);
  }
}
