import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Amusement,
  Site,
} from '../models';
import {AmusementRepository} from '../repositories';

export class AmusementSiteController {
  constructor(
    @repository(AmusementRepository)
    public amusementRepository: AmusementRepository,
  ) { }

  @get('/amusements/{id}/site', {
    responses: {
      '200': {
        description: 'Site belonging to Amusement',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Site)},
          },
        },
      },
    },
  })
  async getSite(
    @param.path.number('id') id: typeof Amusement.prototype.id,
  ): Promise<Site> {
    return this.amusementRepository.site(id);
  }
}
