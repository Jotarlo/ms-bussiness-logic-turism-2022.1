import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Qualify,
  VisitorSite,
} from '../models';
import {QualifyRepository} from '../repositories';

export class QualifyVisitorSiteController {
  constructor(
    @repository(QualifyRepository)
    public qualifyRepository: QualifyRepository,
  ) { }

  @get('/qualifies/{id}/visitor-site', {
    responses: {
      '200': {
        description: 'VisitorSite belonging to Qualify',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VisitorSite)},
          },
        },
      },
    },
  })
  async getVisitorSite(
    @param.path.number('id') id: typeof Qualify.prototype.id,
  ): Promise<VisitorSite> {
    return this.qualifyRepository.visitorSite(id);
  }
}
