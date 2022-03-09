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
  AmusementType,
} from '../models';
import {AmusementRepository} from '../repositories';

export class AmusementAmusementTypeController {
  constructor(
    @repository(AmusementRepository)
    public amusementRepository: AmusementRepository,
  ) { }

  @get('/amusements/{id}/amusement-type', {
    responses: {
      '200': {
        description: 'AmusementType belonging to Amusement',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AmusementType)},
          },
        },
      },
    },
  })
  async getAmusementType(
    @param.path.number('id') id: typeof Amusement.prototype.id,
  ): Promise<AmusementType> {
    return this.amusementRepository.amusementType(id);
  }
}
