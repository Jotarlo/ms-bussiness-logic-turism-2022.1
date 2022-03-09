import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  AmusementImage,
  Amusement,
} from '../models';
import {AmusementImageRepository} from '../repositories';

export class AmusementImageAmusementController {
  constructor(
    @repository(AmusementImageRepository)
    public amusementImageRepository: AmusementImageRepository,
  ) { }

  @get('/amusement-images/{id}/amusement', {
    responses: {
      '200': {
        description: 'Amusement belonging to AmusementImage',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Amusement)},
          },
        },
      },
    },
  })
  async getAmusement(
    @param.path.number('id') id: typeof AmusementImage.prototype.id,
  ): Promise<Amusement> {
    return this.amusementImageRepository.amusement(id);
  }
}
