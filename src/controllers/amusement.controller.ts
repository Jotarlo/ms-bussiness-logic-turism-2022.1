import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {AmusementType} from '../models';
import {AmusementTypeRepository} from '../repositories';

export class AmusementController {
  constructor(
    @repository(AmusementTypeRepository)
    public amusementTypeRepository : AmusementTypeRepository,
  ) {}

  @post('/amusement-types')
  @response(200, {
    description: 'AmusementType model instance',
    content: {'application/json': {schema: getModelSchemaRef(AmusementType)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AmusementType, {
            title: 'NewAmusementType',
            exclude: ['id'],
          }),
        },
      },
    })
    amusementType: Omit<AmusementType, 'id'>,
  ): Promise<AmusementType> {
    return this.amusementTypeRepository.create(amusementType);
  }

  @get('/amusement-types/count')
  @response(200, {
    description: 'AmusementType model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AmusementType) where?: Where<AmusementType>,
  ): Promise<Count> {
    return this.amusementTypeRepository.count(where);
  }

  @get('/amusement-types')
  @response(200, {
    description: 'Array of AmusementType model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AmusementType, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AmusementType) filter?: Filter<AmusementType>,
  ): Promise<AmusementType[]> {
    return this.amusementTypeRepository.find(filter);
  }

  @patch('/amusement-types')
  @response(200, {
    description: 'AmusementType PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AmusementType, {partial: true}),
        },
      },
    })
    amusementType: AmusementType,
    @param.where(AmusementType) where?: Where<AmusementType>,
  ): Promise<Count> {
    return this.amusementTypeRepository.updateAll(amusementType, where);
  }

  @get('/amusement-types/{id}')
  @response(200, {
    description: 'AmusementType model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AmusementType, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AmusementType, {exclude: 'where'}) filter?: FilterExcludingWhere<AmusementType>
  ): Promise<AmusementType> {
    return this.amusementTypeRepository.findById(id, filter);
  }

  @patch('/amusement-types/{id}')
  @response(204, {
    description: 'AmusementType PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AmusementType, {partial: true}),
        },
      },
    })
    amusementType: AmusementType,
  ): Promise<void> {
    await this.amusementTypeRepository.updateById(id, amusementType);
  }

  @put('/amusement-types/{id}')
  @response(204, {
    description: 'AmusementType PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() amusementType: AmusementType,
  ): Promise<void> {
    await this.amusementTypeRepository.replaceById(id, amusementType);
  }

  @del('/amusement-types/{id}')
  @response(204, {
    description: 'AmusementType DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.amusementTypeRepository.deleteById(id);
  }
}
