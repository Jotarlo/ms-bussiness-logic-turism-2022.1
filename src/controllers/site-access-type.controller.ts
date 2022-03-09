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
  AccessType,
} from '../models';
import {SiteRepository} from '../repositories';

export class SiteAccessTypeController {
  constructor(
    @repository(SiteRepository)
    public siteRepository: SiteRepository,
  ) { }

  @get('/sites/{id}/access-type', {
    responses: {
      '200': {
        description: 'AccessType belonging to Site',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AccessType)},
          },
        },
      },
    },
  })
  async getAccessType(
    @param.path.number('id') id: typeof Site.prototype.id,
  ): Promise<AccessType> {
    return this.siteRepository.accessType(id);
  }
}
