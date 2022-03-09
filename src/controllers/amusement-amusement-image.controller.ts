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
  Amusement,
  AmusementImage,
} from '../models';
import {AmusementRepository} from '../repositories';

export class AmusementAmusementImageController {
  constructor(
    @repository(AmusementRepository) protected amusementRepository: AmusementRepository,
  ) { }

  @get('/amusements/{id}/amusement-images', {
    responses: {
      '200': {
        description: 'Array of Amusement has many AmusementImage',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AmusementImage)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<AmusementImage>,
  ): Promise<AmusementImage[]> {
    return this.amusementRepository.amusementImages(id).find(filter);
  }

  @post('/amusements/{id}/amusement-images', {
    responses: {
      '200': {
        description: 'Amusement model instance',
        content: {'application/json': {schema: getModelSchemaRef(AmusementImage)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Amusement.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AmusementImage, {
            title: 'NewAmusementImageInAmusement',
            exclude: ['id'],
            optional: ['amusementId']
          }),
        },
      },
    }) amusementImage: Omit<AmusementImage, 'id'>,
  ): Promise<AmusementImage> {
    return this.amusementRepository.amusementImages(id).create(amusementImage);
  }

  @patch('/amusements/{id}/amusement-images', {
    responses: {
      '200': {
        description: 'Amusement.AmusementImage PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AmusementImage, {partial: true}),
        },
      },
    })
    amusementImage: Partial<AmusementImage>,
    @param.query.object('where', getWhereSchemaFor(AmusementImage)) where?: Where<AmusementImage>,
  ): Promise<Count> {
    return this.amusementRepository.amusementImages(id).patch(amusementImage, where);
  }

  @del('/amusements/{id}/amusement-images', {
    responses: {
      '200': {
        description: 'Amusement.AmusementImage DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(AmusementImage)) where?: Where<AmusementImage>,
  ): Promise<Count> {
    return this.amusementRepository.amusementImages(id).delete(where);
  }
}
