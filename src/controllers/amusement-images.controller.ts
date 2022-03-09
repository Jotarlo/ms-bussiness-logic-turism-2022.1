import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {AmusementImage} from '../models';
import {AmusementImageRepository} from '../repositories';

export class AmusementImagesController {
  constructor(
    @repository(AmusementImageRepository)
    public amusementImageRepository : AmusementImageRepository,
  ) {}

  @post('/amusement-images')
  @response(200, {
    description: 'AmusementImage model instance',
    content: {'application/json': {schema: getModelSchemaRef(AmusementImage)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AmusementImage, {
            title: 'NewAmusementImage',
            exclude: ['id'],
          }),
        },
      },
    })
    amusementImage: Omit<AmusementImage, 'id'>,
  ): Promise<AmusementImage> {
    return this.amusementImageRepository.create(amusementImage);
  }

  @get('/amusement-images/count')
  @response(200, {
    description: 'AmusementImage model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AmusementImage) where?: Where<AmusementImage>,
  ): Promise<Count> {
    return this.amusementImageRepository.count(where);
  }

  @get('/amusement-images')
  @response(200, {
    description: 'Array of AmusementImage model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AmusementImage, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AmusementImage) filter?: Filter<AmusementImage>,
  ): Promise<AmusementImage[]> {
    return this.amusementImageRepository.find(filter);
  }

  @patch('/amusement-images')
  @response(200, {
    description: 'AmusementImage PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AmusementImage, {partial: true}),
        },
      },
    })
    amusementImage: AmusementImage,
    @param.where(AmusementImage) where?: Where<AmusementImage>,
  ): Promise<Count> {
    return this.amusementImageRepository.updateAll(amusementImage, where);
  }

  @get('/amusement-images/{id}')
  @response(200, {
    description: 'AmusementImage model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AmusementImage, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AmusementImage, {exclude: 'where'}) filter?: FilterExcludingWhere<AmusementImage>
  ): Promise<AmusementImage> {
    return this.amusementImageRepository.findById(id, filter);
  }

  @patch('/amusement-images/{id}')
  @response(204, {
    description: 'AmusementImage PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AmusementImage, {partial: true}),
        },
      },
    })
    amusementImage: AmusementImage,
  ): Promise<void> {
    await this.amusementImageRepository.updateById(id, amusementImage);
  }

  @put('/amusement-images/{id}')
  @response(204, {
    description: 'AmusementImage PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() amusementImage: AmusementImage,
  ): Promise<void> {
    await this.amusementImageRepository.replaceById(id, amusementImage);
  }

  @del('/amusement-images/{id}')
  @response(204, {
    description: 'AmusementImage DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.amusementImageRepository.deleteById(id);
  }
}
